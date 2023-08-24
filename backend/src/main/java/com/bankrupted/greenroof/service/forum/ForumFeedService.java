package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForumFeedService {

    private final ForumQuestionRepository forumQuestionRepository;

    public ResponseEntity<?> getAllForumPosts() {
        return ResponseEntity.ok(forumQuestionRepository.findAll());
    }

    public ResponseEntity<?> getSingleForumPost(Integer id) {
        return ResponseEntity.ok(forumQuestionRepository.findById(id).get());
    }
}
