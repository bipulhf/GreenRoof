package com.bankrupted.greenroof.forum.service;

import com.bankrupted.greenroof.forum.dto.FeedResponseDto;
import com.bankrupted.greenroof.forum.dto.ForumQuestionDto;
import com.bankrupted.greenroof.forum.dto.ForumQuestionTagDto;
import com.bankrupted.greenroof.forum.entity.ForumQuestionTag;
import com.bankrupted.greenroof.forum.repository.ForumAnswerRepository;
import com.bankrupted.greenroof.forum.repository.ForumQuestionTagRepository;
import com.bankrupted.greenroof.user.dto.UserDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.forum.entity.ForumQuestion;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.forum.repository.ForumQuestionRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ForumFeedService {

    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ForumAnswerRepository forumAnswerRepository;
    private final ForumQuestionTagRepository forumQuestionTagRepository;
    private final ModelMapperUtility<ForumQuestion, ForumQuestionDto> questionModelMapper;
    private final ModelMapperUtility<User, UserDto> userModelMapper;
    private final ModelMapperUtility<ForumQuestionTag, ForumQuestionTagDto> tagModelMapper;
    private int pageSize = 7;

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
        return (ForumQuestionDto) questionModelMapper.modelMap(question, ForumQuestionDto.class);
    }

    public List<ForumQuestionDto> getUserForumQuestion(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        List<ForumQuestion> forumQuestionList = forumQuestionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return questionModelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);
    }

    public FeedResponseDto<ForumQuestionDto> getResponseDto(Page<ForumQuestion> forumQuestionPage) {
        List<ForumQuestion> forumQuestionList = forumQuestionPage.getContent();
        List<ForumQuestionDto> forumQuestionDtoList = questionModelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);

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

    public List<UserDto> getTopUser() {
        List<User> userList = userRepository.findTop5ByOrderByScoreDesc();
        return userModelMapper.modelMap(userList, UserDto.class);
    }

    public Map<String, Integer> getNumberOfAnswers(Long questionId) {
        Map<String, Integer> mp = new HashMap<>();
        if(forumAnswerRepository.getTotalNumberOfAnswersOfQuestion(questionId) == null) {
            mp.put("noa", 0);
            return mp;
        }
        mp.put("noa", forumAnswerRepository.getTotalNumberOfAnswersOfQuestion(questionId).intValue());
        return mp;
    }

    public FeedResponseDto<ForumQuestionDto> getQuestionByTag(Integer pageNo, String tag) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        ForumQuestionTag questionTag = forumQuestionTagRepository.findByTag(tag);
        Page<ForumQuestion> forumQuestionPage = forumQuestionRepository.findByQuestionTagOrderByCreatedAtDesc(pageable, questionTag);
        return getResponseDto(forumQuestionPage);
    }

    public List<ForumQuestionTagDto> getTags() {
        List<ForumQuestionTag> forumQuestionTags = forumQuestionTagRepository.findAll();
        return tagModelMapper.modelMap(forumQuestionTags, ForumQuestionTagDto.class);
    }
}
