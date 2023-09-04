package com.bankrupted.greenroof.registration.password;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.bankrupted.greenroof.token.PasswordResetToken;
import com.bankrupted.greenroof.user.User;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public void createPasswordResetTokenForUser(User user, String passwordToken) {
        PasswordResetToken passwordRestToken = new PasswordResetToken(passwordToken, user);
        passwordResetTokenRepository.save(passwordRestToken);
    }

    public String validatePasswordResetToken(String passwordResetToken) {
        PasswordResetToken passwordToken = passwordResetTokenRepository.findByToken(passwordResetToken);
        if (passwordToken == null) {
            return "Invalid verification token";
        }
        User user = passwordToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((passwordToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            return "Link already expired, resend link";
        }
        return "valid";
    }

    public Optional<User> findUserByPasswordToken(String passwordResetToken) {
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(passwordResetToken).getUser());
    }

    public PasswordResetToken findPasswordResetToken(String token) {
        return passwordResetTokenRepository.findByToken(token);
    }
}
