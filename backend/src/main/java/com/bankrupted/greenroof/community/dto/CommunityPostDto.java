package com.bankrupted.greenroof.community.dto;

import com.bankrupted.greenroof.community.entity.Attatchments;
import com.bankrupted.greenroof.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityPostDto {
    private Long id;
    private String postText;
    private Set<Attatchments> postAttatchments;
    private Date createdAt;
    private UserDto user;
}
