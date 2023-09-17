package com.bankrupted.greenroof.community.service;

import com.bankrupted.greenroof.forum.dto.FeedResponseDto;
import com.bankrupted.greenroof.community.dto.CommunityPostDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.community.entity.CommunityPost;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.community.repository.CommunityPostRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CommunityFeedService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtility<CommunityPost, CommunityPostDto> modelMapper;
    private int pageSize = 7;

    public FeedResponseDto<CommunityPostDto> getAllCommunityPosts(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<CommunityPost> communityPostPage = communityPostRepository.findAll(pageable);
        return getResponseDto(communityPostPage);
    }

    public FeedResponseDto<CommunityPostDto> getAllRecentCommunityPosts(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<CommunityPost> communityPostPage = communityPostRepository.findAllByOrderByCreatedAtDesc(pageable);
        return getResponseDto(communityPostPage);
    }

    public CommunityPostDto getSingleCommunityPost(Long id) {
        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Post with id " + id + " does not exists."));
        return (CommunityPostDto) modelMapper.modelMap(post, CommunityPostDto.class);
    }

    public FeedResponseDto<CommunityPostDto> getUserCommunityPost(String username, Integer pageNo) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<CommunityPost> communityPosts = communityPostRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), pageable);
        return getResponseDto(communityPosts);
    }

    private FeedResponseDto<CommunityPostDto> getResponseDto(Page<CommunityPost> communityPostPage) {
        List<CommunityPost> communityPostList = communityPostPage.getContent();
        List<CommunityPostDto> communityPostDtos = modelMapper.modelMap(communityPostList, CommunityPostDto.class);

        FeedResponseDto<CommunityPostDto> feedResponseDto = FeedResponseDto.<CommunityPostDto>builder()
                .contentList(communityPostDtos)
                .pageNo(communityPostPage.getNumber())
                .pageSize(communityPostPage.getSize())
                .totalPages(communityPostPage.getTotalPages())
                .totalElements(communityPostPage.getTotalElements())
                .last(communityPostPage.isLast())
                .build();
        return feedResponseDto;
    }
}
