package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CommunityPostService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final CommunityCommentService communityCommentService;


    public ResponseEntity<?> craeteNewCommunityPost(String username, CommunityPost communityPost) {
        communityPost.setUser(userRepository.findByUsername(username).get());
        communityPost.setCreatedAt(new Date());
        communityPost.setPriorityValue(0.0);
        communityPostRepository.save(communityPost);
        return new ResponseEntity<>("Post Created", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateCommunityPost(String username, Long postId, CommunityPost communityPost) {
        CommunityPost prevPost = communityPostRepository.findById(postId).get();

        communityPost.setId(postId);
        communityPost.setUser(userRepository.findByUsername(username).get());
        communityPost.setCreatedAt(new Date());
        communityPost.setPriorityValue(prevPost.getPriorityValue());
        communityPostRepository.save(communityPost);
        return new ResponseEntity<>("Post Updated", HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteCommmunityPost(String username, Long postId) {
        communityCommentService.deleteComment(postId);
        communityPostRepository.deleteById(postId);
        return new ResponseEntity<>("Post Deleted", HttpStatus.OK);
    }
}
