package com.bankrupted.greenroof.security.token.repository;

import com.bankrupted.greenroof.security.token.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
   VerificationToken findByToken(String token);
}
