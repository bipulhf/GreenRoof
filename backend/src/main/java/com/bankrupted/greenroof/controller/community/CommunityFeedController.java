package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.service.community.CommunityFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/community/feed")
@RequiredArgsConstructor
public class CommunityFeedController {

    private final CommunityFeedService communityFeedService;

    @GetMapping("/")
    public ResponseEntity<?> getAllCommunityPosts() {
        return communityFeedService.getAllCommunityPosts();
    }

    @GetMapping("get/{id}")
    public ResponseEntity<?> getSingleCommunityPost(@PathVariable Long id) {
        return communityFeedService.getSingleCommunityPost(id);
    }

    @GetMapping("{username}")
    public ResponseEntity<?> getUserCommunityPost(@PathVariable String username) {
        return communityFeedService.getUserCommunityPost(username);
    }
}
