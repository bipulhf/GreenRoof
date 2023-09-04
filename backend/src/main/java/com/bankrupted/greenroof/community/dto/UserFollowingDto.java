package com.bankrupted.greenroof.community.dto;

import com.bankrupted.greenroof.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFollowingDto {
    private Long id;
    private UserDto following;
}
