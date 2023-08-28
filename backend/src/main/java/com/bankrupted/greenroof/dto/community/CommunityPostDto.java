package com.bankrupted.greenroof.dto.community;

import com.bankrupted.greenroof.dto.UserDto;
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
