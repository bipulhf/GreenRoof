package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.dto.community.CommunityPostDto;
import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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
        CommunityPost post = communityPostRepository.findById(id).get();
        return modelMapper.modelMap(post, CommunityPostDto.class);
    }

    public ResponseEntity<?> getUserCommunityPost(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        List<CommunityPost> communityPosts = communityPostRepository.findByUserId(userId);
        return modelMapper.modelMap(communityPosts, CommunityPostDto.class);
    }
}
