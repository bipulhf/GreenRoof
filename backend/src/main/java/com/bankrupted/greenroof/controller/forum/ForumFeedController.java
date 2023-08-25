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

    @GetMapping("get/all")
    public ResponseEntity<?> getAllForumQuestions() {
        return forumFeedService.getAllForumQuestions();
    }

    @GetMapping("get/{id}")
    public ResponseEntity<?> getSingleForumQuestion(@PathVariable Integer id) {
        return forumFeedService.getSingleForumQuestion(id);
    }

    @GetMapping("{username}")
    public ResponseEntity<?> getUserForumQuestion(@PathVariable String username) {
        return forumFeedService.getUserForumQuestion(username);
    }
}
