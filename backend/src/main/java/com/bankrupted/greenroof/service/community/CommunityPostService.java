package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommunityPostService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final CommunityCommentService communityCommentService;


    public ResponseEntity<?> craeteNewCommunityPost(String username, CommunityPost communityPost) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        communityPost.setUser(user);
        communityPost.setCreatedAt(new Date());
        communityPost.setPriorityValue(0.0);
        communityPostRepository.save(communityPost);
        return new ResponseEntity<>("Post Created", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateCommunityPost(String username, Long postId, CommunityPost communityPost) {
        CommunityPost prevPost = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));;

        if(!Objects.equals(prevPost.getUser().getUsername(), username))
            return new ResponseEntity<>("You are not allowed to edit this post.", HttpStatus.FORBIDDEN);

        communityPost.setId(postId);
        communityPost.setUser(prevPost.getUser());
        communityPost.setCreatedAt(new Date());
        communityPost.setPriorityValue(prevPost.getPriorityValue());
        communityPostRepository.save(communityPost);
        return new ResponseEntity<>("Post Updated", HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteCommmunityPost(String username, Long postId) {
        CommunityPost prevPost = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));;

        if(!Objects.equals(prevPost.getUser().getUsername(), username))
            return new ResponseEntity<>("You are not allowed to delete this post.", HttpStatus.FORBIDDEN);

        communityCommentService.deleteComment(postId);
        communityPostRepository.deleteById(postId);
        return new ResponseEntity<>("Post Deleted", HttpStatus.OK);
    }
}
