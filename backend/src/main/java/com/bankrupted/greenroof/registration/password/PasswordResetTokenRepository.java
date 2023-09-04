package com.bankrupted.greenroof.registration.password;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankrupted.greenroof.token.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String passwordResetToken);
}
