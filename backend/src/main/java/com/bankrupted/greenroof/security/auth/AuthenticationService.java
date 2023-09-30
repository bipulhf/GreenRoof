package com.bankrupted.greenroof.security.auth;

import com.bankrupted.greenroof.config.JwtService;
import com.bankrupted.greenroof.exception.GenericException;
import com.bankrupted.greenroof.security.token.IsTokenValid;
import com.bankrupted.greenroof.security.token.Token;
import com.bankrupted.greenroof.security.token.repository.TokenRepository;
import com.bankrupted.greenroof.security.token.TokenType;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              request.getUsername(), request.getPassword()));

      var user = userRepository.findByUsername(request.getUsername())
          .orElseThrow();

      if(user.isBanned())
          throw new GenericException("You are banned from the site.");

      var jwtToken = jwtService.generateToken(user);
      var refreshToken = jwtService.generateRefreshToken(user);
      revokeAllUserTokens(user);
      saveUserToken(user, jwtToken);
      return AuthenticationResponse.builder()
          .accessToken(jwtToken)
          .refreshToken(refreshToken)
          .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
          return;
        validUserTokens.forEach(token -> {
          token.setExpired(true);
          token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
        HttpServletRequest request,
        HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return;
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);
        if (username != null) {
            var user = this.userRepository.findByUsername(username) // look here
                .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
              var accessToken = jwtService.generateToken(user);
              revokeAllUserTokens(user);
              saveUserToken(user, accessToken);
              var authResponse = AuthenticationResponse.builder()
                  .accessToken(accessToken)
                  .refreshToken(refreshToken)
                  .build();
              new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    public Map<String, Boolean> isTokenValid(IsTokenValid token) {
        Map<String, Boolean> mp = new HashMap<>();
        User user = userRepository.findByUsername(token.getUsername()).
                orElseThrow(() -> new NoSuchElementException("User Not Found"));
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        for(Token singleToken : validUserTokens)
            if(singleToken.getToken().equals(token.getAccessToken())) {
                mp.put("isTokenValid", true);
                return mp;
            }
        mp.put("isTokenValid", false);
        return mp;
    }
}
