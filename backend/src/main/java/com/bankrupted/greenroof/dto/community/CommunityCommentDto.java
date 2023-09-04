package com.bankrupted.greenroof.dto.community;

import com.bankrupted.greenroof.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityCommentDto {
    private Long id;
    private String commentText;
    private Date createdAt;
    private UserDto commenter;
}
