package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.dto.FeedResponseDto;
import com.bankrupted.greenroof.dto.forum.ForumQuestionDto;
import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
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
public class ForumFeedService {

    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtility<ForumQuestion, ForumQuestionDto> modelMapper;
    private int pageSize = 5;

    public FeedResponseDto<ForumQuestionDto> getAllForumQuestions(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ForumQuestion> forumQuestionPage = forumQuestionRepository.findAll(pageable);
        return getResponseDto(forumQuestionPage);
    }

    public FeedResponseDto<ForumQuestionDto> getAllRecentForumQuestions(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ForumQuestion> forumQuestionPage = forumQuestionRepository.findAllByOrderByCreatedAtDesc(pageable);
        return getResponseDto(forumQuestionPage);
    }

    public ForumQuestionDto getSingleForumQuestion(Long questionId) {
        ForumQuestion question = forumQuestionRepository.findByIdOrderByCreatedAtDesc(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question with id " + questionId + " does not exists."));
        return (ForumQuestionDto) modelMapper.modelMap(question, ForumQuestionDto.class);
    }

    public List<ForumQuestionDto> getUserForumQuestion(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        List<ForumQuestion> forumQuestionList = forumQuestionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return modelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);
    }

    private FeedResponseDto<ForumQuestionDto> getResponseDto(Page<ForumQuestion> forumQuestionPage) {
        List<ForumQuestion> forumQuestionList = forumQuestionPage.getContent();
        List<ForumQuestionDto> forumQuestionDtoList = modelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);

        FeedResponseDto<ForumQuestionDto> feedResponseDto = FeedResponseDto.<ForumQuestionDto>builder()
                .contentList(forumQuestionDtoList)
                .pageNo(forumQuestionPage.getNumber())
                .pageSize(forumQuestionPage.getSize())
                .totalPages(forumQuestionPage.getTotalPages())
                .totalElements(forumQuestionPage.getTotalElements())
                .last(forumQuestionPage.isLast())
                .build();
        return feedResponseDto;
    }
}
