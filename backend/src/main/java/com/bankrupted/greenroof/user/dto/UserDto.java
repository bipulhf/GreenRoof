package com.bankrupted.greenroof.user.dto;

import com.bankrupted.greenroof.user.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String profilePhoto;
    private Long score;
    private RoleType role;
    private String city;
    private Boolean isBanned;
}
