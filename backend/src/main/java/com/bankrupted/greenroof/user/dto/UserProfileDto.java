package com.bankrupted.greenroof.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private Integer score;
    private String city;
    private String profilePhoto;
    private Date createdAt;
}
