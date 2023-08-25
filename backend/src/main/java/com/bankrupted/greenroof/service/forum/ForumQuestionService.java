package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForumQuestionService {
    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ForumAnswerService forumAnswerService;

    public ResponseEntity<?> craeteNewForumQuestion(String username, ForumQuestion forumQuestion) {
        forumQuestion.setQuestioner(userRepository.findByUsername(username).get());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Created", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateForumQuestion(String username, Integer questionId, ForumQuestion forumQuestion) {
        forumQuestion.setId(questionId.longValue());
        forumQuestion.setQuestioner(userRepository.findByUsername(username).get());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Updated", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteForumQuestion(String username, Integer questionId) {
        forumAnswerService.deleteAnswerOfQuestion(questionId.longValue());
        forumQuestionRepository.deleteById(questionId.longValue());
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }
}
