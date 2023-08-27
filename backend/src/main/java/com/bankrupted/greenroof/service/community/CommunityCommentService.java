package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.entity.community.CommunityComment;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityCommentRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CommunityCommentService {

    private final CommunityCommentRepository communityCommentRepository;
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;

    public ResponseEntity<?> addComment(String username, Long postId, CommunityComment communityComment) {
        communityComment.setCommenter(userRepository.findByUsername(username).get());
        communityComment.setCreatedAt(new Date());
        communityComment.setPost(communityPostRepository.findById(postId).get());
        communityCommentRepository.save(communityComment);
        return new ResponseEntity<>("Comment Successful", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateComment(String username, Long commentId, CommunityComment communityComment) {
        CommunityComment prevComment = communityCommentRepository.findById(commentId).get();

        communityComment.setId(commentId);
        communityComment.setCreatedAt(new Date());
        communityComment.setCommenter(prevComment.getCommenter());
        communityComment.setPost(prevComment.getPost());
        communityCommentRepository.save(communityComment);
        return new ResponseEntity<>("Comment Updated", HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteComment(String username, Long commentId) {
        communityCommentRepository.deleteById(commentId);
        return new ResponseEntity<>("Comment Deleted", HttpStatus.OK);
    }

    public void deleteComment(Long postId) {
        communityCommentRepository.deleteByPostId(postId);
    }

    public ResponseEntity<?> getCommentsOfSinglePost(Long postId) {
        return ResponseEntity.ok(communityCommentRepository.findByPostId(postId));
    }
}
