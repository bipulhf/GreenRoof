package com.bankrupted.greenroof.dto.forum;

import com.bankrupted.greenroof.dto.UserDto;
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
