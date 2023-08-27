package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.service.community.CommunityFollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community")
@RequiredArgsConstructor
public class CommunityFollowController {
    private final CommunityFollowService communityFollowService;

    @PostMapping("{user1}/follows/{user2}")
    public ResponseEntity<?> followUser(@PathVariable String user1, @PathVariable String user2) {
        return communityFollowService.followUser(user1, user2);
    }

    @GetMapping("{username}/followers")
    public ResponseEntity<?> getFollowersList(@PathVariable String username) {
        return communityFollowService.getFollowersList(username);
    }

    @GetMapping("{username}/followings")
    public ResponseEntity<?> getFollowingsList(@PathVariable String username) {
        return communityFollowService.getFollowingsList(username);
    }
}
