package com.bankrupted.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Getters,Setters
@Builder // Create auto builder method
@AllArgsConstructor
@NoArgsConstructor

public class AuthenticationResponse {
    private String token;
}
