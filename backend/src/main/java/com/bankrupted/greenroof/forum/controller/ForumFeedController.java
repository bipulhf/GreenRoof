package com.bankrupted.greenroof.forum.controller;

import com.bankrupted.greenroof.forum.service.ForumFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum/feed")
public class ForumFeedController {

    private final ForumFeedService forumFeedService;

    @GetMapping("")
    public ResponseEntity<?> getAllForumQuestions(@RequestParam(defaultValue = "0", required = false) Integer pageNo) {
        return new ResponseEntity<>(forumFeedService.getAllForumQuestions(pageNo), HttpStatus.OK);
    }

    @GetMapping("recent")
    public ResponseEntity<?> getAllRecentForumQuestions(@RequestParam(defaultValue = "0", required = false) Integer pageNo) {
        return new ResponseEntity<>(forumFeedService.getAllRecentForumQuestions(pageNo), HttpStatus.OK);
    }

    @GetMapping("question")
    public ResponseEntity<?> getSingleForumQuestion(@RequestParam Long questionId) {
        return new ResponseEntity<>(forumFeedService.getSingleForumQuestion(questionId), HttpStatus.OK);
    }

    @GetMapping("user")
    public ResponseEntity<?> getUserForumQuestion(@RequestParam String username) {
        return new ResponseEntity<>(forumFeedService.getUserForumQuestion(username), HttpStatus.OK);
    }
}
