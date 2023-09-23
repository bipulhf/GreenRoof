package com.bankrupted.greenroof.user.controller;

import com.bankrupted.greenroof.user.dto.ProfilePictureDto;
import com.bankrupted.greenroof.user.service.UserService;
import com.bankrupted.greenroof.utils.GetUsername;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("profile_picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestBody ProfilePictureDto photoLink) {
        String username = GetUsername.get();
        return new ResponseEntity<>(userService.uploadProfilePicture(username, photoLink), HttpStatus.CREATED);
    }
}
