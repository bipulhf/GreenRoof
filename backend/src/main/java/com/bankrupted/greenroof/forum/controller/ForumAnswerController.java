package com.bankrupted.greenroof.forum.controller;

import com.bankrupted.greenroof.forum.entity.ForumAnswer;
import com.bankrupted.greenroof.forum.service.ForumAnswerService;
import com.bankrupted.greenroof.forum.service.ForumVoteService;
import com.bankrupted.greenroof.utils.GetUsername;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum/answer")
public class ForumAnswerController {

    private final ForumAnswerService forumAnswerService;
    private final ForumVoteService forumVoteService;

    @GetMapping("get")
    public ResponseEntity<?> getSingleForumAnswer(@RequestParam Long answerId) {
        return new ResponseEntity<>(forumAnswerService.getSingleForumAnswer(answerId), HttpStatus.OK);
    }

    @PostMapping("add/{questionId}")
    public ResponseEntity<?> addAnswerToQuestion(@PathVariable Long questionId, @RequestBody @Valid ForumAnswer forumAnswer) {
        String username = GetUsername.get();
        return forumAnswerService.addAnswerToQuestion(username, questionId, forumAnswer);
    }

    @PutMapping("update/{answerId}")
    public ResponseEntity<?> updateForumQuestion(@PathVariable Long answerId, @RequestBody ForumAnswer forumAnswer) {
        String username = GetUsername.get();
        return forumAnswerService.updateForumQuestion(username, answerId, forumAnswer);
    }

    @Transactional
    @DeleteMapping("delete/{answerId}")
    public ResponseEntity<?> deleteAnswerOfQuestion(@PathVariable Long answerId) {
        String username = GetUsername.get();
        return  forumAnswerService.deleteAnswerOfQuestion(username, answerId);
    }

    @GetMapping("")
    public ResponseEntity<?> getAnswerOfSingleQuestion(@RequestParam Long questionId) {
        return new ResponseEntity<>(forumAnswerService.getAnswersOfSingleQuestion(questionId), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("vote/{answerId}/up")
    public ResponseEntity<?> upvoteOnAnswer(@PathVariable Long answerId) {
        String username = GetUsername.get();
        return forumVoteService.upvoteOnAnswer(answerId, username);
    }

    @Transactional
    @PostMapping("vote/{answerId}/down")
    public ResponseEntity<?> downvoteOnAnswer(@PathVariable Long answerId) {
        String username = GetUsername.get();
        return forumVoteService.downvoteOnAnswer(answerId, username);
    }

    @GetMapping("vote")
    public ResponseEntity<?> hasUserVoted(@RequestParam Long answerId) {
        String username = GetUsername.get();
        return forumVoteService.hasUserVoted(answerId, username);
    }
}
