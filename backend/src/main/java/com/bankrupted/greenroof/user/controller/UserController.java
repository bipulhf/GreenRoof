package com.bankrupted.greenroof.user.controller;

import com.bankrupted.greenroof.user.dto.ProfilePictureDto;
import com.bankrupted.greenroof.user.dto.UserBasicInfoDto;
import com.bankrupted.greenroof.user.dto.UserProfileDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.service.UserService;
import com.bankrupted.greenroof.utils.GetUsername;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapperUtility<User, UserProfileDto> modelMapperUtility;

    @GetMapping("")
    public ResponseEntity<?> getUser(@RequestParam String username) {
        User user = userService.findByUsername(username).get();
        return new ResponseEntity<>(modelMapperUtility.modelMap(user, UserProfileDto.class), HttpStatus.OK);
    }

    @PutMapping("info")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserBasicInfoDto userInfo) {
        String username = GetUsername.get();
        return new ResponseEntity<>(userService.updateUserInfo(username, userInfo), HttpStatus.CREATED);
    }

    @PutMapping("profile_picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestBody ProfilePictureDto photoLink) {
        String username = GetUsername.get();
        return new ResponseEntity<>(userService.uploadProfilePicture(username, photoLink), HttpStatus.CREATED);
    }
}
