package com.bankrupted.greenroof.auth;

import com.bankrupted.greenroof.entity.user.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;
  private String username;
  private String email;
  private String password;
  private RoleType role;
}
