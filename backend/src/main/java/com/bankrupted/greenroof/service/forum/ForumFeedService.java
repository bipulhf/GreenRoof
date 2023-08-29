package com.bankrupted.greenroof.service.forum;

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
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ForumFeedService {

    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtility<ForumQuestion, ForumQuestionDto> modelMapper;

    public ResponseEntity<?> getAllForumQuestions() {
        List<ForumQuestion> forumQuestionList = forumQuestionRepository.findAll();
        return modelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);
    }

    public ResponseEntity<?> getAllRecentForumQuestions() {
        List<ForumQuestion> forumQuestionList = forumQuestionRepository.findAllByOrderByCreatedAtDesc();
        return modelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);
    }

    public ResponseEntity<?> getSingleForumQuestion(Long questionId) {
        ForumQuestion question = forumQuestionRepository.findByIdOrderByCreatedAtDesc(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question with id " + questionId + " does not exists."));
        return modelMapper.modelMap(question, ForumQuestionDto.class);
    }

    public ResponseEntity<?> getUserForumQuestion(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        List<ForumQuestion> forumQuestionList = forumQuestionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return modelMapper.modelMap(forumQuestionList, ForumQuestionDto.class);
    }
}
