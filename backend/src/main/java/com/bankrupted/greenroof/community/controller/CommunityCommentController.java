package com.bankrupted.greenroof.community.controller;

import com.bankrupted.greenroof.community.entity.CommunityComment;
import com.bankrupted.greenroof.community.service.CommunityCommentService;
import com.bankrupted.greenroof.utils.GetUsername;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community/comment")
@RequiredArgsConstructor
public class CommunityCommentController {

    private final CommunityCommentService communityCommentService;

    @PostMapping("add/{postId}")
    public ResponseEntity<?> addComment(@PathVariable Long postId, @Valid @RequestBody CommunityComment communityComment) {
        String username = GetUsername.get();
        return  communityCommentService.addComment(username, postId, communityComment);
    }

    @PutMapping("update/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable Long commentId, @RequestBody CommunityComment communityComment) {
        String username = GetUsername.get();
        return communityCommentService.updateComment(username, commentId, communityComment);
    }

    @Transactional
    @DeleteMapping("delete/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        String username = GetUsername.get();
        return communityCommentService.deleteComment(username, commentId);
    }

    @GetMapping("")
    public ResponseEntity<?> getCommentsOfSinglePost(@RequestParam Long postId) {
        return new ResponseEntity<>(communityCommentService.getCommentsOfSinglePost(postId), HttpStatus.OK);
    }
}
