package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.service.community.CommunityPostService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/coomunity/post")
@RequiredArgsConstructor
public class CommunityPostController {

    private final CommunityPostService communityPostService;

    @PostMapping("create/{username}")
    public ResponseEntity<?> createNewCommunityPost(@PathVariable String username, @RequestBody CommunityPost communityPost) {
        return communityPostService.craeteNewCommunityPost(username, communityPost);
    }

    @PutMapping("update/{username}/{postId}")
    public ResponseEntity<?> updateCommunityPost(@PathVariable String username, @PathVariable Long postId, @RequestBody CommunityPost communityPost) {
        return communityPostService.updateCommunityPost(username, postId, communityPost);
    }

    @Transactional
    @DeleteMapping("delete/{username}/{questionId}")
    public ResponseEntity<?> deleteCommunityPost(@PathVariable String username, @PathVariable Long postId) {
        return communityPostService.deleteCommmunityPost(username, postId);
    }

}
