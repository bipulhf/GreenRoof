package com.bankrupted.greenroof.community.service;

import com.bankrupted.greenroof.user.dto.UserProfileDto;
import com.bankrupted.greenroof.community.dto.CommunityPostDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.community.entity.CommunityPost;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.community.repository.CommunityPostRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunitySearchService {
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;
    private final ModelMapperUtility<User, UserProfileDto> modelMapperUser;
    private final ModelMapperUtility<CommunityPost, CommunityPostDto> modelMapperPost;

    public List<UserProfileDto> searchByUsername(String username) {
        List<User> userList = userRepository.searchByUsername(username);
        return modelMapperUser.modelMap(userList, UserProfileDto.class);
    }

    public List<CommunityPostDto> searchCommunityPost(String text) {
        List<CommunityPost> communityPosts = communityPostRepository.searchPost(text);
        return modelMapperPost.modelMap(communityPosts, CommunityPostDto.class);
    }
}
