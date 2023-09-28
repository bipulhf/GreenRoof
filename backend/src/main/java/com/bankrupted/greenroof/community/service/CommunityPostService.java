package com.bankrupted.greenroof.community.service;

import com.bankrupted.greenroof.community.entity.CommunityPostLike;
import com.bankrupted.greenroof.community.repository.CommunityPostLikeRepository;
import com.bankrupted.greenroof.exception.GenericException;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.community.Notification.NotificationStorageRepository;
import com.bankrupted.greenroof.community.Notification.NotificationStorageService;
import com.bankrupted.greenroof.community.Notification.NotificationType;
import com.bankrupted.greenroof.community.entity.CommunityPost;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.community.repository.CommunityPostRepository;
import com.bankrupted.greenroof.utils.IsAdmin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommunityPostService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final NotificationStorageService notificationStorageService;
    private final CommunityCommentService communityCommentService;
    private final CommunityPostLikeRepository communityPostLikeRepository;
    private final IsAdmin isAdmin;

    public ResponseEntity<?> createNewCommunityPost(String username, CommunityPost communityPost) {
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
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));
        ;

        if (!Objects.equals(prevPost.getUser().getUsername(), username))
            throw new GenericException("You are not allowed to edit this post.");

        communityPost.setId(postId);
        communityPost.setUser(prevPost.getUser());
        communityPost.setCreatedAt(new Date());
        communityPost.setPriorityValue(prevPost.getPriorityValue());
        communityPostRepository.save(communityPost);
        return new ResponseEntity<>("Post Updated", HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteCommmunityPost(String username, Long postId) {
        CommunityPost prevPost = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));


        if (!Objects.equals(prevPost.getUser().getUsername(), username) && !isAdmin.check())
            throw new GenericException("You are not allowed to delete this post.");
        if (communityPostLikeRepository.totalNumberOfLikes(postId) > 0)
            communityPostLikeRepository.deleteByPostId(prevPost);
        if (communityCommentService.getCommentCountOfAPost(postId).get("numberOfComments") > 0)
            communityCommentService.deleteComment(postId);
        communityPostRepository.deleteById(postId);
        return new ResponseEntity<>("Post Deleted", HttpStatus.OK);
    }

    public ResponseEntity<?> totalNumberOfLikeOfAPost(Long postId) {
        CommunityPost post = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));
        Map<String, Integer> mp = new HashMap<>();
        mp.put("totalLikes", communityPostLikeRepository.totalNumberOfLikes(postId));
        return new ResponseEntity<>(mp, HttpStatus.OK);
    }

    public ResponseEntity<?> likeCommunityPost(Long postId, String username) {
        CommunityPost post = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));
        User liker = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        User postOwner = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));

        CommunityPostLike communityPostLike = new CommunityPostLike();
        communityPostLike.setPostId(post);
        communityPostLike.setCreatedAt(new Date());
        communityPostLike.setLiker(liker);

        if (communityPostLikeRepository.existsByPostIdAndLikerId(postId, liker.getId()) > 0) {
            CommunityPostLike postLike = communityPostLikeRepository.findByPostIdAndLikerId(postId, liker.getId())
                    .get();
            communityPostLikeRepository.deleteById(postLike.getId());
            return new ResponseEntity<>("Post Disliked Successful", HttpStatus.OK);
        }

        if (liker.getId() != postOwner.getId()) {
            notificationStorageService.createNotificationStorage(postOwner, liker, post, NotificationType.Like);
        }

        communityPostLikeRepository.save(communityPostLike);
        return new ResponseEntity<>("Post Liked Successful", HttpStatus.OK);
    }

    public ResponseEntity<?> hasUserLiked(Long postId, String username) {
        CommunityPost post = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));

        Map<String, Boolean> mp = new HashMap<>();
        if (communityPostLikeRepository.existsByPostIdAndLikerId(postId, user.getId()) > 0) {
            mp.put("userLiked", true);
            return new ResponseEntity<>(mp, HttpStatus.OK);
        }
        mp.put("userLiked", false);
        return new ResponseEntity<>(mp, HttpStatus.OK);
    }
}
