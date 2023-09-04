package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.dto.FeedResponseDto;
import com.bankrupted.greenroof.dto.community.CommunityPostDto;
import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.community.CommunityPost;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CommunityFeedService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtility<CommunityPost, CommunityPostDto> modelMapper;
    private int pageSize = 5;


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

    public List<CommunityPostDto> getUserCommunityPost(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        List<CommunityPost> communityPosts = communityPostRepository.findByUserId(user.getId());
        return modelMapper.modelMap(communityPosts, CommunityPostDto.class);
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
