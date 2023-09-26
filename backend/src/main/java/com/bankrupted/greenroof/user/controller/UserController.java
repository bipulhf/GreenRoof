package com.bankrupted.greenroof.user.controller;

import com.bankrupted.greenroof.user.dto.ProfilePictureDto;
import com.bankrupted.greenroof.user.dto.UserBasicInfoDto;
import com.bankrupted.greenroof.user.service.UserService;
import com.bankrupted.greenroof.utils.GetUsername;
import com.bankrupted.greenroof.utils.IsAdmin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final IsAdmin isAdmin;

    @GetMapping("")
    public ResponseEntity<?> getUser(@RequestParam String username) {
        return new ResponseEntity<>(userService.getUser(username), HttpStatus.OK);
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

    @PostMapping("ban/{username}")
    public ResponseEntity<?> banUser(@PathVariable String username) {
        if(isAdmin.check())
            return new ResponseEntity<>(userService.banUser(username), HttpStatus.CREATED);
        return new ResponseEntity<>("You are not an Admin", HttpStatus.FORBIDDEN);
    }
}
