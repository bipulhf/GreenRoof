package com.bankrupted.greenroof.controller.forum;

import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.service.forum.ForumQuestionService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum/question")
public class ForumQuestionController {

    private final ForumQuestionService forumQuestionService;

    @PostMapping("create/{username}")
    public ResponseEntity<?> createNewForumQuestion(@PathVariable String username, @RequestBody @Valid ForumQuestion forumQuestion) {
        return forumQuestionService.craeteNewForumQuestion(username, forumQuestion);
    }

    @PutMapping("update/{username}/{questionId}")
    public ResponseEntity<?> updateForumQuestion(@PathVariable String username, @PathVariable Long questionId, @RequestBody ForumQuestion forumQuestion) {
        return forumQuestionService.updateForumQuestion(username, questionId, forumQuestion);
    }

    @Transactional
    @DeleteMapping("delete/{username}/{questionId}")
    public ResponseEntity<?> deleteForumQuestion(@PathVariable String username, @PathVariable Long questionId) {
        return forumQuestionService.deleteForumQuestion(username, questionId);
    }

}
