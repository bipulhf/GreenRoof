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

    public ResponseEntity<?> craeteNewForumQuestion(String username, ForumQuestion forumQuestion) {
        forumQuestion.setQuestioner(userRepository.findByUsername(username).get());
        forumQuestionRepository.save(forumQuestion);
        return new ResponseEntity<>("Created", HttpStatus.CREATED);
    }
}
