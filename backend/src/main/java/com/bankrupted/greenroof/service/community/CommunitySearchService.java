package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.dto.UserProfileDto;
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

@Service
@RequiredArgsConstructor
public class CommunitySearchService {
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;
    private final ModelMapperUtility<User, UserProfileDto> modelMapperUser;
    private final ModelMapperUtility<CommunityPost, CommunityPostDto> modelMapperPost;

    public ResponseEntity<?> searchByUsername(String username) {
        List<User> userList = userRepository.searchByUsername(username);
        return modelMapperUser.modelMap(userList, UserProfileDto.class);
    }

    public ResponseEntity<?> searchCommunityPost(String text) {
        List<CommunityPost> communityPosts = communityPostRepository.searchPost(text);
        return modelMapperPost.modelMap(communityPosts, CommunityPostDto.class);
    }
}
