package com.bankrupted.greenroof.forum.service;

import com.bankrupted.greenroof.user.dto.UserProfileDto;
import com.bankrupted.greenroof.forum.dto.ForumQuestionDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.forum.entity.ForumQuestion;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.forum.repository.ForumQuestionRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumSearchService {
    private final UserRepository userRepository;
    private final ForumQuestionRepository forumQuestionRepository;
    private final ModelMapperUtility<User, UserProfileDto> modelMapperUser;
    private final ModelMapperUtility<ForumQuestion, ForumQuestionDto> modelMapperQuestion;


    public List<UserProfileDto> searchByUsername(String username) {
        List<User> userList = userRepository.searchByUsername(username);
        return modelMapperUser.modelMap(userList, UserProfileDto.class);
    }

    public List<ForumQuestionDto> searchCommunityPost(String text) {
        List<ForumQuestion> questionList = forumQuestionRepository.searchQuestion(text);
        return modelMapperQuestion.modelMap(questionList, ForumQuestionDto.class);
    }
}
