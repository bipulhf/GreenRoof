package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.dto.community.CommunityPostDto;
import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CommunityFeedService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtility<CommunityPost, CommunityPostDto> modelMapper;

    public ResponseEntity<?> getAllCommunityPosts() {
        List<CommunityPost> communityPosts = communityPostRepository.findAll();
        return modelMapper.modelMap(communityPosts, CommunityPostDto.class);
    }

    public ResponseEntity<?> getAllRecentCommunityPosts() {
        List<CommunityPost> communityPosts = communityPostRepository.findAllByOrderByCreatedAtDesc();
        return modelMapper.modelMap(communityPosts, CommunityPostDto.class);
    }

    public ResponseEntity<?> getSingleCommunityPost(Long id) {
        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + id + " does not exists."));
        return modelMapper.modelMap(post, CommunityPostDto.class);
    }

    public ResponseEntity<?> getUserCommunityPost(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        List<CommunityPost> communityPosts = communityPostRepository.findByUserId(user.getId());
        return modelMapper.modelMap(communityPosts, CommunityPostDto.class);
    }
}
