package com.bankrupted.greenroof.controller.forum;

import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import com.bankrupted.greenroof.entity.forum.ForumVote;
import com.bankrupted.greenroof.service.forum.ForumAnswerService;
import com.bankrupted.greenroof.service.forum.ForumVoteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/forum/answer")
public class ForumAnswerController {

    private final ForumAnswerService forumAnswerService;
    private final ForumVoteService forumVoteService;

    @PostMapping("add/{username}/{questionId}")
    public ResponseEntity<?> addAnswerToQuestion(@PathVariable String username, @PathVariable Long questionId,@RequestBody ForumAnswer forumAnswer) {
        return  forumAnswerService.addAnswerToQuestion(username, questionId, forumAnswer);
    }

    @PutMapping("update/{username}/{answerId}")
    public ResponseEntity<?> updateForumQuestion(@PathVariable String username, @PathVariable Long answerId, @RequestBody ForumAnswer forumAnswer) {
        return forumAnswerService.updateForumQuestion(username, answerId, forumAnswer);
    }

    @Transactional
    @DeleteMapping("delete/{username}/{answerId}")
    public ResponseEntity<?> deleteAnswerOfQuestion(@PathVariable String username, @PathVariable Long answerId) {
        return  forumAnswerService.deleteAnswerOfQuestion(username, answerId);
    }

    @GetMapping("")
    public ResponseEntity<?> getAnswerOfSingleQuestion(@RequestParam Long questionId) {
        return forumAnswerService.getAnswersOfSingleQuestion(questionId);
    }

    @Transactional
    @PutMapping("vote/{username}/{answerId}/up")
    public ResponseEntity<?> upvoteOnAnswer(@PathVariable Long answerId, @PathVariable String username) {
        return forumVoteService.upvoteOnAnswer(answerId, username);
    }

    @Transactional
    @PutMapping("vote/{username}/{answerId}/down")
    public ResponseEntity<?> downvoteOnAnswer(@PathVariable Long answerId, @PathVariable String username) {
        return forumVoteService.downvoteOnAnswer(answerId, username);
    }
}
