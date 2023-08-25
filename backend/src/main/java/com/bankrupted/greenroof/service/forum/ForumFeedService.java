package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForumFeedService {

    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;

    public ResponseEntity<?> getAllForumQuestions() {
        return ResponseEntity.ok(forumQuestionRepository.findAll());
    }

    public ResponseEntity<?> getSingleForumQuestion(Integer id) {
        return ResponseEntity.ok(forumQuestionRepository.findById(id.longValue()).get());
    }

    public ResponseEntity<?> getUserForumQuestion(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(forumQuestionRepository.findByUserId(userId));
    }
}
