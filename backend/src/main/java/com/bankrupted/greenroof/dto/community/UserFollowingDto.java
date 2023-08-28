package com.bankrupted.greenroof.dto.community;

import com.bankrupted.greenroof.dto.UserDto;
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
