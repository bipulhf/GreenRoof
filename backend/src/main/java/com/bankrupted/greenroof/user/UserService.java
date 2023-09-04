package com.bankrupted.greenroof.user;

import com.bankrupted.greenroof.auth.AuthenticationService;
import com.bankrupted.greenroof.exception.UserAlreadyExistsException;
import com.bankrupted.greenroof.registration.RegistrationRequest;
import com.bankrupted.greenroof.registration.password.PasswordResetTokenService;
import com.bankrupted.greenroof.token.VerificationToken;
import com.bankrupted.greenroof.token.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.cglib.core.Local;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordResetTokenService passwordResetTokenService;
    private final AuthenticationService authService;

    public User registerUser(RegistrationRequest request) {
        Optional<User> userWithUsername = this.findByUsername(request.getUsername());
        Optional<User> userWithEmail = this.findByEmail(request.getEmail());

        // if username is same
        if (userWithUsername.isPresent()) {
            throw new UserAlreadyExistsException(
                    "User with Username: " + request.getUsername() + " already exists");
        }

        // if email is same

        if (userWithEmail.isPresent()) {
            throw new UserAlreadyExistsException(
                    "User with Email: " + request.getEmail() + " already exists");
        }

        var newUser = new User();
        newUser.setFirstName(request.getFirstname());
        newUser.setLastName(request.getLastname());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setRole(request.getRole());
        newUser.setCity(request.getCity());
        newUser.setCreatedAt(LocalDate.now());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        var savedUser = userRepository.save(newUser);
        return savedUser;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void saveUserVerificationToken(User theUser, String token) {
        var verificationToken = new VerificationToken(token, theUser);
        tokenRepository.save(verificationToken);
    }

    public String validateToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if (token == null) {
            return "Invalid verification token";
        }
        User user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            return "Verification link already expired," +
                    " Please, click the link below to receive a new verification link";
        }
        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
    }

    public VerificationToken generateNewVerificationToken(String oldToken) {
        VerificationToken verificationToken = tokenRepository.findByToken(oldToken);
        var verificationTokenTime = new VerificationToken();
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setExpirationTime(verificationTokenTime.getTokenExpirationTime());
        return tokenRepository.save(verificationToken);
    }

    public void changePassword(User theUser, String newPassword) {
        theUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(theUser);
    }

    public String validatePasswordResetToken(String token) {
        return passwordResetTokenService.validatePasswordResetToken(token);
    }

    public User findUserByPasswordToken(String token) {
        return passwordResetTokenService.findUserByPasswordToken(token).get();
    }

    public void createPasswordResetTokenForUser(User user, String passwordResetToken) {
        passwordResetTokenService.createPasswordResetTokenForUser(user, passwordResetToken);
    }

    public boolean oldPasswordIsValid(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

}
