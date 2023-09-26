package com.bankrupted.greenroof.user.dto;

import com.bankrupted.greenroof.user.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private Integer score;
    private String city;
    private String profilePhoto;
    private RoleType role;
    private Boolean isBanned;
    private LocalDate createdAt;
}
