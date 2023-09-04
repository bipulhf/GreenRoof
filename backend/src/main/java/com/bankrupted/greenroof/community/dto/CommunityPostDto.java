package com.bankrupted.greenroof.community.dto;

import com.bankrupted.greenroof.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityPostDto {
    private Long id;
    private String  postText;
    private byte[] postAttatchments;
    private Date createdAt;
    private UserDto user;
}
