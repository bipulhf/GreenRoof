package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import com.bankrupted.greenroof.entity.forum.ForumVote;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumAnswerRepository;
import com.bankrupted.greenroof.repository.forum.ForumVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ForumVoteService {

    private final UserRepository userRepository;
    private final ForumAnswerRepository forumAnswerRepository;
    private final ForumVoteRepository forumVoteRepository;

    public ResponseEntity<?> upvoteOnAnswer(Long answerId, String username) {
        User voter = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        ForumAnswer answer = forumAnswerRepository.findById(answerId)
                .orElseThrow(() -> new NoSuchElementException("Answer with id " + answerId + " does not exists."));

        if (Objects.equals(answer.getAnswerer().getUsername(), username))
            return new ResponseEntity<>("You can't vote your own answer.", HttpStatus.FORBIDDEN);

        ForumVote forumVote = new ForumVote();
        if(checkVote(voter.getId(), answerId) && isUpvoted(voter.getId(), answerId))
            return new ResponseEntity<>("Already Voted", HttpStatus.OK);
        else if(checkVote(voter.getId(), answerId) && !isUpvoted(voter.getId(), answerId)) {
            changeExistingVote(forumVote, answerId, voter);
            return new ResponseEntity<>("Upvoted Successfully", HttpStatus.OK);
        }

        forumVote.setAnswer(answer);
        forumVote.setVoter(voter);
        forumVote.setVote((short) 1);
        forumVote.setCreatedAt(new Date());
        forumVoteRepository.save(forumVote);
        return new ResponseEntity<>("Upvoted Successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> downvoteOnAnswer(Long answerId, String username) {
        User voter = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        ForumAnswer answer = forumAnswerRepository.findById(answerId)
                .orElseThrow(() -> new NoSuchElementException("Answer with id " + answerId + " does not exists."));

        if (Objects.equals(answer.getAnswerer().getUsername(), username))
            return new ResponseEntity<>("You can't vote your own answer.", HttpStatus.FORBIDDEN);

        ForumVote forumVote = new ForumVote();
        if(checkVote(voter.getId(), answerId) && !isUpvoted(voter.getId(), answerId))
            return new ResponseEntity<>("Already Voted", HttpStatus.OK);
        else if(checkVote(voter.getId(), answerId) && isUpvoted(voter.getId(), answerId)) {
            changeExistingVote(forumVote, answerId, voter);
            return new ResponseEntity<>("Downvoted Successfully", HttpStatus.OK);
        }

        forumVote.setAnswer(answer);
        forumVote.setVoter(voter);
        forumVote.setCreatedAt(new Date());
        forumVote.setVote((short) -1);
        forumVoteRepository.save(forumVote);
        return new ResponseEntity<>("Downvoted Successfully", HttpStatus.OK);
    }

    private boolean checkVote(Long voterId, Long answerId) {
        Boolean voteExists = forumVoteRepository.existsByAnswerIdAndVoterId(answerId, voterId);
        if(voteExists)
            return true;
        return false;
    }

    private boolean isUpvoted(Long voterId, Long answerId) {

        if(checkVote(voterId, answerId)) {
            Integer vote = Integer.valueOf(forumVoteRepository.findByAnswerIdAndVoterId(answerId, voterId).get().getVote());
            if(vote == 1)
                return true;
            else
                return false;
        }
        return false;
    }

    private void changeExistingVote(ForumVote forumVote, Long answerId, User voter) {
        ForumVote vote = forumVoteRepository.findByAnswerIdAndVoterId(answerId, voter.getId()).get();
        Short newVote = (short) (isUpvoted(voter.getId(), answerId) ? -1 : 1);
        forumVote.setId(vote.getId());
        forumVote.setVote(newVote);
        forumVote.setAnswer(vote.getAnswer());
        forumVote.setVoter(vote.getVoter());
        forumVote.setCreatedAt(new Date());
        forumVoteRepository.save(forumVote);
    }
}
