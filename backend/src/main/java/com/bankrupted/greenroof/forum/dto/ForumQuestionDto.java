package com.bankrupted.greenroof.forum.dto;

import com.bankrupted.greenroof.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForumQuestionDto {
    private Long id;
    private String questionTitle;
    private String questionText;
    private Date createdAt;
    private UserDto questioner;
}
