package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.entity.community.CommunityComment;
import com.bankrupted.greenroof.service.community.CommunityCommentService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/community/comment")
@RequiredArgsConstructor
public class CommunityCommentController {

    private final CommunityCommentService communityCommentService;

    @PostMapping("add/{username}/{postId}")
    public ResponseEntity<?> addComment(@PathVariable String username, @PathVariable Long postId, @Valid @RequestBody CommunityComment communityComment) {
        return  communityCommentService.addComment(username, postId, communityComment);
    }

    @PutMapping("update/{username}/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable String username, @PathVariable Long commentId, @RequestBody CommunityComment communityComment) {
        return communityCommentService.updateComment(username, commentId, communityComment);
    }

    @Transactional
    @DeleteMapping("delete/{username}/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable String username, @PathVariable Long commentId) {
        return  communityCommentService.deleteComment(username, commentId);
    }

    @GetMapping("")
    public ResponseEntity<?> getCommentsOfSinglePost(@RequestParam Long postId) {
        return communityCommentService.getCommentsOfSinglePost(postId);
    }
}
