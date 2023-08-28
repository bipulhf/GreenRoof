package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.service.community.CommunityFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community/feed")
@RequiredArgsConstructor
public class CommunityFeedController {

    private final CommunityFeedService communityFeedService;

    @GetMapping("")
    public ResponseEntity<?> getAllCommunityPosts() {
        return communityFeedService.getAllCommunityPosts();
    }

    @GetMapping("recent")
    public ResponseEntity<?> getAllRecentCommunityPosts() {
        return communityFeedService.getAllRecentCommunityPosts();
    }

    @GetMapping("post")
    public ResponseEntity<?> getSingleCommunityPost(@RequestParam Long postId) {
        return communityFeedService.getSingleCommunityPost(postId);
    }

    @GetMapping("user")
    public ResponseEntity<?> getUserCommunityPost(@RequestParam String username) {
        return communityFeedService.getUserCommunityPost(username);
    }
}
