package com.bankrupted.greenroof.forum.service;

import com.bankrupted.greenroof.exception.GenericException;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.forum.entity.ForumQuestion;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.forum.repository.ForumQuestionRepository;
import com.bankrupted.greenroof.utils.IsAdmin;
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
    private final IsAdmin isAdmin;

    public ResponseEntity<?> craeteNewForumQuestion(String username, ForumQuestion forumQuestion) {
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        forumQuestion.setQuestioner(user);
        forumQuestion.setCreatedAt(new Date());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Question Added", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateForumQuestion(String username, Long questionId, ForumQuestion forumQuestion) {
        boolean FORBIDDEN = getQuestionEditPermission(questionId, username);
        if (FORBIDDEN)
            throw new GenericException("You are not allowed to edit this question.");;

        forumQuestion.setId(questionId);
        forumQuestion.setCreatedAt(new Date());
        forumQuestion.setQuestioner(userRepository.findByUsername(username).get());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Updated", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteForumQuestion(String username, Long questionId) {
        boolean FORBIDDEN = getQuestionEditPermission(questionId, username);
        if (FORBIDDEN && !isAdmin.check())
            throw new GenericException("You are not allowed to delete this question.");
        forumAnswerService.deleteAnswerOfQuestion(questionId, username);
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
