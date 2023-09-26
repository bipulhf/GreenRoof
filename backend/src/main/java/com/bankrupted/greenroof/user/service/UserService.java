package com.bankrupted.greenroof.user.service;

import com.bankrupted.greenroof.security.auth.AuthenticationService;
import com.bankrupted.greenroof.exception.UserAlreadyExistsException;
import com.bankrupted.greenroof.registration.RegistrationRequest;
import com.bankrupted.greenroof.registration.password.PasswordResetTokenService;
import com.bankrupted.greenroof.security.token.VerificationToken;
import com.bankrupted.greenroof.security.token.repository.VerificationTokenRepository;
import com.bankrupted.greenroof.user.dto.ProfilePictureDto;
import com.bankrupted.greenroof.user.dto.UserBasicInfoDto;
import com.bankrupted.greenroof.user.dto.UserProfileDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;

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
    private final ModelMapperUtility<User, UserProfileDto> modelMapperUtility;
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
        newUser.setScore(0);
        newUser.setCreatedAt(LocalDate.now());
        newUser.setProfilePhoto(request.getProfilePhoto());
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

    public UserProfileDto getUser(String username) {
        User user = findByUsername(username).get();
        UserProfileDto userProfileDto = UserProfileDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .city(user.getCity())
                .score(user.getScore())
                .profilePhoto(user.getProfilePhoto())
                .isBanned(user.isBanned())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
        return userProfileDto;
    }

    public String uploadProfilePicture(String username, ProfilePictureDto photoLink) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("Username not found."));
        user.setId(user.getId());
        user.setProfilePhoto(photoLink.getLink());
        userRepository.save(user);
        return "Uploaded";
    }

    public String updateUserInfo(String username, UserBasicInfoDto userInfo) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("Username not found."));
        user.setId(user.getId());
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        userRepository.save(user);
        return "Updated";
    }

    public String banUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("Username not found."));
        user.setId(user.getId());
        user.setBanned(!user.isBanned());
        userRepository.save(user);
        return "Successful";
    }
}
