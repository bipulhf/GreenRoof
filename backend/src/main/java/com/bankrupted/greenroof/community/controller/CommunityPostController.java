package com.bankrupted.greenroof.community.controller;

import com.bankrupted.greenroof.community.Notification.NotificationType;
import com.bankrupted.greenroof.community.entity.CommunityPost;
import com.bankrupted.greenroof.community.service.CommunityPostService;
import com.bankrupted.greenroof.utils.GetUsername;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community/post")
@RequiredArgsConstructor
public class CommunityPostController {

    private final CommunityPostService communityPostService;

    @PostMapping("create")
    public ResponseEntity<?> createNewCommunityPost(@RequestBody CommunityPost communityPost) {
        String username = GetUsername.get();
        System.out.println(communityPost);
        return communityPostService.createNewCommunityPost(username, communityPost);
    }

    @PutMapping("update/{postId}")
    public ResponseEntity<?> updateCommunityPost(@PathVariable Long postId, @RequestBody CommunityPost communityPost) {
        String username = GetUsername.get();
        return communityPostService.updateCommunityPost(username, postId, communityPost);
    }

    @Transactional
    @DeleteMapping("delete/{postId}")
    public ResponseEntity<?> deleteCommunityPost(@PathVariable Long postId) {
        String username = GetUsername.get();
        return communityPostService.deleteCommmunityPost(username, postId);
    }

    @GetMapping("{postId}/like")
    public ResponseEntity<?> totalNumberOfLikeOfAPost(@PathVariable Long postId) {
        return communityPostService.totalNumberOfLikeOfAPost(postId);
    }

    @Transactional
    @PostMapping("{postId}/like")
    public ResponseEntity<?> likeCommunityPost(@PathVariable Long postId) {
        String liker = GetUsername.get();
        return communityPostService.likeCommunityPost(postId, liker);
    }

    @GetMapping("{postId}/userLike")
    public ResponseEntity<?> hasUserLiked(@PathVariable Long postId) {
        String username = GetUsername.get();
        return communityPostService.hasUserLiked(postId, username);
    }
}
