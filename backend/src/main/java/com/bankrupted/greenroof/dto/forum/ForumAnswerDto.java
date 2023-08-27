package com.bankrupted.greenroof.dto.forum;

import com.bankrupted.greenroof.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ForumAnswerDto {
    private Long id;
    private String answerText;
    private Integer score;
    private Date createdAt;
    private User answerer;
}
