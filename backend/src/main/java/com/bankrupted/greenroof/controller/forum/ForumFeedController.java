package com.bankrupted.greenroof.controller.forum;

import com.bankrupted.greenroof.service.forum.ForumFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum/feed")
public class ForumFeedController {

    private final ForumFeedService forumFeedService;

    @GetMapping("")
    public ResponseEntity<?> getAllForumQuestions() {
        return forumFeedService.getAllForumQuestions();
    }

    @GetMapping("recent")
    public ResponseEntity<?> getAllRecentForumQuestions() {
        return forumFeedService.getAllRecentForumQuestions();
    }

    @GetMapping("question")
    public ResponseEntity<?> getSingleForumQuestion(@RequestParam Long questionId) {
        return forumFeedService.getSingleForumQuestion(questionId);
    }

    @GetMapping("user")
    public ResponseEntity<?> getUserForumQuestion(@RequestParam String username) {
        return forumFeedService.getUserForumQuestion(username);
    }
}
