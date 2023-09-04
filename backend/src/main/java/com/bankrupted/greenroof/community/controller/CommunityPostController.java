package com.bankrupted.greenroof.community.controller;

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
        return communityPostService.createNewCommunityPost(username, communityPost);
    }

    @PutMapping("update/{postId}")
    public ResponseEntity<?> updateCommunityPost(@PathVariable Long postId, @RequestBody CommunityPost communityPost) {
        String username = GetUsername.get();
        return communityPostService.updateCommunityPost(username, postId, communityPost);
    }

    @Transactional
    @DeleteMapping("delete/{questionId}")
    public ResponseEntity<?> deleteCommunityPost(@PathVariable Long questionId) {
        String username = GetUsername.get();
        return communityPostService.deleteCommmunityPost(username, questionId);
    }

}
