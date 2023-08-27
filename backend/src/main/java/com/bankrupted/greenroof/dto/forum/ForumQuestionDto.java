package com.bankrupted.greenroof.dto.forum;

import com.bankrupted.greenroof.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ForumQuestionDto {
    private Long id;
    private String questionTitle;
    private String questionText;
    private Date createdAt;
    private User questioner;
}
