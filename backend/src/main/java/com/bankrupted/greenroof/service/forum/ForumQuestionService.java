package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ForumQuestionService {
    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ForumAnswerService forumAnswerService;

    public ResponseEntity<?> craeteNewForumQuestion(String username, ForumQuestion forumQuestion) {
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        forumQuestion.setQuestioner(user);
        forumQuestion.setCreatedAt(new Date());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Question created successfully.", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateForumQuestion(String username, Long questionId, ForumQuestion forumQuestion) {
        boolean FORBIDDEN = getQuestionEditPermission(questionId, username);
        if (FORBIDDEN)
            return new ResponseEntity<>("You are not allowed to edit this question.", HttpStatus.FORBIDDEN);;

        forumQuestion.setId(questionId);
        forumQuestion.setCreatedAt(new Date());
        forumQuestion.setQuestioner(userRepository.findByUsername(username).get());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Updated", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteForumQuestion(String username, Long questionId) {
        boolean FORBIDDEN = getQuestionEditPermission(questionId, username);
        if (FORBIDDEN)
            return new ResponseEntity<>("You are not allowed to delete this question.", HttpStatus.FORBIDDEN);;
        forumAnswerService.deleteAnswerOfQuestion(questionId);
        forumQuestionRepository.deleteById(questionId);
        return new ResponseEntity<>("Question deleted successfully.", HttpStatus.OK);
    }

    private boolean getQuestionEditPermission(Long questionId, String username) {
        ForumQuestion oldQuestion = forumQuestionRepository.findById(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question with id " + questionId + " does not exists."));
        if (!Objects.equals(oldQuestion.getQuestioner().getUsername(), username))
            return true;
        return false;
    }
}
