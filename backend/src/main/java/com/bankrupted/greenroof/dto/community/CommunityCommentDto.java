package com.bankrupted.greenroof.dto.community;

import com.bankrupted.greenroof.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CommunityCommentDto {
    private Long id;
    private String commentText;
    private Date createdAt;
    private User commenter;
}
