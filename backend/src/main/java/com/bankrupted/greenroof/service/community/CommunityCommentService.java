package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.dto.community.CommunityCommentDto;
import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.community.CommunityComment;
import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityCommentRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommunityCommentService {

    private final CommunityCommentRepository communityCommentRepository;
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;
    private final ModelMapperUtility<CommunityComment, CommunityCommentDto> modelMapper;


    public ResponseEntity<?> addComment(String username, Long postId, CommunityComment communityComment) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));

        CommunityPost post = communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));

        communityComment.setCommenter(user);
        communityComment.setCreatedAt(new Date());
        communityComment.setPost(post);
        communityCommentRepository.save(communityComment);
        return new ResponseEntity<>("Comment Successful", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateComment(String username, Long commentId, CommunityComment communityComment) {
        CommunityComment prevComment = communityCommentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("Comment with id " + commentId + " does not exists."));;;

        if(!Objects.equals(prevComment.getCommenter().getUsername(), username))
            return new ResponseEntity<>("You are not allowed to edit this comment.", HttpStatus.FORBIDDEN);

        communityComment.setId(commentId);
        communityComment.setCreatedAt(new Date());
        communityComment.setCommenter(prevComment.getCommenter());
        communityComment.setPost(prevComment.getPost());
        communityCommentRepository.save(communityComment);
        return new ResponseEntity<>("Comment Updated", HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteComment(String username, Long commentId) {
        CommunityComment prevComment = communityCommentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("Comment with id " + commentId + " does not exists."));

        if(!Objects.equals(prevComment.getCommenter().getUsername(), username))
            return new ResponseEntity<>("You are not allowed to delete this comment.", HttpStatus.FORBIDDEN);

        communityCommentRepository.deleteById(commentId);
        return new ResponseEntity<>("Comment Deleted", HttpStatus.OK);
    }

    public void deleteComment(Long postId) {
        communityCommentRepository.deleteByPostId(postId);
    }

    public List<CommunityCommentDto> getCommentsOfSinglePost(Long postId) {
        communityPostRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + postId + " does not exists."));

        List<CommunityComment> communityComments = communityCommentRepository.findByPostId(postId);
        return modelMapper.modelMap(communityComments, CommunityCommentDto.class);
    }
}
