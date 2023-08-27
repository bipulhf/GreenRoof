package com.bankrupted.greenroof.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String city;
    private String profilePhoto;
    private Date createdAt;
}
