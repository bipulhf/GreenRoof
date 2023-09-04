package com.bankrupted.greenroof.forum.dto;

import com.bankrupted.greenroof.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForumAnswerDto {
    private Long id;
    private String answerText;
    private Integer score;
    private Date createdAt;
    private UserDto answerer;
}
