package com.bankrupted.greenroof.forum.controller;

import com.bankrupted.greenroof.forum.entity.ForumQuestion;
import com.bankrupted.greenroof.forum.service.ForumQuestionService;
import com.bankrupted.greenroof.utils.GetUsername;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum/question")
@CrossOrigin
public class ForumQuestionController {

    private final ForumQuestionService forumQuestionService;

    @PostMapping("create")
    public ResponseEntity<?> createNewForumQuestion(@RequestBody @Valid ForumQuestion forumQuestion) {
        String username = GetUsername.get();
        return forumQuestionService.craeteNewForumQuestion(username, forumQuestion);
    }

    @PutMapping("update/{questionId}")
    public ResponseEntity<?> updateForumQuestion(@PathVariable Long questionId, @RequestBody ForumQuestion forumQuestion) {
        String username = GetUsername.get();
        return forumQuestionService.updateForumQuestion(username, questionId, forumQuestion);
    }

    @Transactional
    @DeleteMapping("delete/{questionId}")
    public ResponseEntity<?> deleteForumQuestion(@PathVariable Long questionId) {
        String username = GetUsername.get();
        return forumQuestionService.deleteForumQuestion(username, questionId);
    }

}
