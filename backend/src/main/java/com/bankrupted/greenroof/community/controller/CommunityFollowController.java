package com.bankrupted.greenroof.community.controller;

import com.bankrupted.greenroof.community.service.CommunityFollowService;
import com.bankrupted.greenroof.utils.GetUsername;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community")
@RequiredArgsConstructor
public class CommunityFollowController {
    private final CommunityFollowService communityFollowService;

    @PostMapping("follows/{user2}")
    public ResponseEntity<?> followUser(@PathVariable String user2) {
        String user1 = GetUsername.get();
        return communityFollowService.followUser(user1, user2);
    }

    @Transactional
    @DeleteMapping("unfollows/{user2}")
    public ResponseEntity<?> unfollowUser(@PathVariable String user2) {
        String user1 = GetUsername.get();
        return communityFollowService.unfollowUser(user1, user2);
    }

    @GetMapping("isFollow/{user2}")
    public ResponseEntity<?> isFollowerOfUser(@PathVariable String user2) {
        String user1 = GetUsername.get();
        return new ResponseEntity<>(communityFollowService.isFollowerOfUser(user1, user2), HttpStatus.OK);
    }

    @GetMapping("followers")
    public ResponseEntity<?> getFollowersList(@RequestParam String username) {
        return new ResponseEntity<>(communityFollowService.getFollowersList(username), HttpStatus.OK);
    }

    @GetMapping("followings")
    public ResponseEntity<?> getFollowingsList(@RequestParam String username) {
        return new ResponseEntity<>(communityFollowService.getFollowingsList(username), HttpStatus.OK);
    }
}
