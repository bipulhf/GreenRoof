package com.bankrupted.greenroof.dto.community;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CommunityPostDto {
    private Long id;
    private String  postText;
    private byte[] postAttatchments;
    private Date createdAt;
}
