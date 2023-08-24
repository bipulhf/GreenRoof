package com.bankrupted.greenroof.controller;

import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.service.forum.ForumFeedService;
import com.bankrupted.greenroof.service.forum.ForumQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum")
public class ForumController {

    private final ForumFeedService forumFeedService;
    private final ForumQuestionService forumQuestionService;

    @PostMapping("{username}/post/create")
    public ResponseEntity<?> createNewForumQuestion(@PathVariable String username, @RequestBody ForumQuestion forumQuestion) {
        return forumQuestionService.craeteNewForumQuestion(username, forumQuestion);
    }

    @GetMapping("post/all")
    public ResponseEntity<?> getAllForumPosts() {
        return forumFeedService.getAllForumPosts();
    }

    @GetMapping("post/{id}")
    public ResponseEntity<?> getSingleForumPost(@PathVariable Integer id) {
        return forumFeedService.getSingleForumPost(id);
    }
}
