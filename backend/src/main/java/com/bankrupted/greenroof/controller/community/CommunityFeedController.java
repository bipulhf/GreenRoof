package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.service.community.CommunityFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community/feed")
@RequiredArgsConstructor
public class CommunityFeedController {

    private final CommunityFeedService communityFeedService;

    @GetMapping("")
    public ResponseEntity<?> getAllCommunityPosts(@RequestParam(defaultValue = "0", required = false)  Integer pageNo) {
        return new ResponseEntity<>(communityFeedService.getAllCommunityPosts(pageNo), HttpStatus.OK);
    }

    @GetMapping("recent")
    public ResponseEntity<?> getAllRecentCommunityPosts(@RequestParam(defaultValue = "0", required = false)  Integer pageNo) {
        return new ResponseEntity<>(communityFeedService.getAllRecentCommunityPosts(pageNo), HttpStatus.OK);
    }

    @GetMapping("post")
    public ResponseEntity<?> getSingleCommunityPost(@RequestParam Long postId) {
        return new ResponseEntity<>(communityFeedService.getSingleCommunityPost(postId), HttpStatus.OK);
    }

    @GetMapping("user")
    public ResponseEntity<?> getUserCommunityPost(@RequestParam String username) {
        return new ResponseEntity<>(communityFeedService.getUserCommunityPost(username), HttpStatus.OK);
    }
}
