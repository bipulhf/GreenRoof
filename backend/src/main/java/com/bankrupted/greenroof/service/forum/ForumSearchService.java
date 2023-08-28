package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.dto.UserProfileDto;
import com.bankrupted.greenroof.dto.forum.ForumQuestionDto;
import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumSearchService {
    private final UserRepository userRepository;
    private final ForumQuestionRepository forumQuestionRepository;
    private final ModelMapperUtility<User, UserProfileDto> modelMapperUser;
    private final ModelMapperUtility<ForumQuestion, ForumQuestionDto> modelMapperQuestion;


    public ResponseEntity<?> searchByUsername(String username) {
        List<User> userList = userRepository.searchByUsername(username);
        return modelMapperUser.modelMap(userList, UserProfileDto.class);
    }

    public ResponseEntity<?> searchCommunityPost(String text) {
        List<ForumQuestion> questionList = forumQuestionRepository.searchQuestion(text);
        return modelMapperQuestion.modelMap(questionList, ForumQuestionDto.class);
    }
}
