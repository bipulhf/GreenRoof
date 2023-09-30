package com.bankrupted.greenroof.community.controller;

import com.bankrupted.greenroof.community.service.CommunityFeedService;
import com.bankrupted.greenroof.utils.GetUsername;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community/feed")
@RequiredArgsConstructor
public class CommunityFeedController {

    private final CommunityFeedService communityFeedService;

    @GetMapping("following")
    public ResponseEntity<?> getFollowingCommunityPosts(@RequestParam Integer pageNo) {
        String username = GetUsername.get();
        return new ResponseEntity<>(communityFeedService.getFollowingCommunityPosts(pageNo, username), HttpStatus.OK);
    }

    @GetMapping("recent")
    public ResponseEntity<?> getAllRecentCommunityPosts(@RequestParam Integer pageNo) {
        return new ResponseEntity<>(communityFeedService.getAllRecentCommunityPosts(pageNo), HttpStatus.OK);
    }

    @GetMapping("post")
    public ResponseEntity<?> getSingleCommunityPost(@RequestParam Long postId) {
        return new ResponseEntity<>(communityFeedService.getSingleCommunityPost(postId), HttpStatus.OK);
    }

    @GetMapping("user")
    public ResponseEntity<?> getUserCommunityPost(@RequestParam String username, @RequestParam Integer pageNo) {
        return new ResponseEntity<>(communityFeedService.getUserCommunityPost(username, pageNo), HttpStatus.OK);
    }
}
