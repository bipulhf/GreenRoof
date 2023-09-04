package com.bankrupted.greenroof.registration;

import com.bankrupted.greenroof.user.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

  private String firstname;
  private String lastname;
  private String username;
  private String email;
  private String password;
  private String city;
  private RoleType role;
}
