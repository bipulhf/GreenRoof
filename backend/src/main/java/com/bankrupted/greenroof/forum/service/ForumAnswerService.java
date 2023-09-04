package com.bankrupted.greenroof.forum.service;

import com.bankrupted.greenroof.exception.GenericException;
import com.bankrupted.greenroof.forum.dto.ForumAnswerDto;
import com.bankrupted.greenroof.forum.entity.ForumAnswer;
import com.bankrupted.greenroof.forum.entity.ForumQuestion;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.forum.repository.ForumAnswerRepository;
import com.bankrupted.greenroof.forum.repository.ForumQuestionRepository;
import com.bankrupted.greenroof.forum.repository.ForumVoteRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ForumAnswerService {

    private final ForumAnswerRepository forumAnswerRepository;
    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ForumVoteRepository forumVoteRepository;
    private final ModelMapperUtility<ForumAnswer, ForumAnswerDto> modelMapper;


    public ResponseEntity<?> addAnswerToQuestion(String username, Long questionId, ForumAnswer forumAnswer) {
        ForumQuestion forumQuestion = forumQuestionRepository.findById(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question with id " + questionId + " does not exists."));

        if(Objects.equals(forumQuestion.getQuestioner().getUsername(), username))
            throw new GenericException("You can't answer on your own question");

        forumAnswer.setScore(0);
        forumAnswer.setAnswerer(userRepository.findByUsername(username).get());
        forumAnswer.setQuestion(forumQuestion);
        forumAnswer.setCreatedAt(new Date());
        forumAnswerRepository.save(forumAnswer);
        return new ResponseEntity<>("Answer Added", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateForumQuestion(String username, Long answerId, ForumAnswer forumAnswer) {
        ForumAnswer prevAnswer = forumAnswerRepository.findById(answerId)
                .orElseThrow(() -> new NoSuchElementException("Answer with id " + answerId + " does not exists."));
        if(!Objects.equals(prevAnswer.getAnswerer().getUsername(), username))
            throw new GenericException("You are not allowed to edit this answer.");

        forumAnswer.setQuestion(prevAnswer.getQuestion());
        forumAnswer.setAnswerer(prevAnswer.getAnswerer());
        forumAnswer.setId(answerId);
        forumAnswer.setCreatedAt(new Date());
        forumAnswerRepository.save(forumAnswer);
        return new ResponseEntity<>("Updated Answer", HttpStatus.CREATED);
    }

    public void deleteAnswerOfQuestion(Long questionId) {
        Boolean doesExist = forumAnswerRepository.existsByQuestionId(questionId);
        if(!doesExist)
            return;

        Long answerId = forumAnswerRepository.findByQuestionIdOrderByScoreDescCreatedAtDesc(questionId).get(0).getId();
        Integer voteListSize = forumVoteRepository.findByAnswerId(answerId).size();
        if(voteListSize > 0) forumVoteRepository.deleteByAnswerId(answerId);
        forumAnswerRepository.deleteByQuestionId(questionId);
    }

    public ResponseEntity<?> deleteAnswerOfQuestion(String username, Long answerId) {
        ForumAnswer forumAnswer = forumAnswerRepository.findById(answerId)
                        .orElseThrow(() -> new NoSuchElementException("Answer with id " + answerId + " does not exists."));

        if(!Objects.equals(forumAnswer.getAnswerer().getUsername(), username))
            throw new GenericException("You are not allowed to delete this answer.");

        if(!forumVoteRepository.findByAnswerId(answerId).isEmpty()) forumVoteRepository.deleteByAnswerId(answerId);
        forumAnswerRepository.deleteById(answerId);
        return new ResponseEntity<>("Answer deleted successfully.", HttpStatus.OK);
    }

    public List<ForumAnswerDto> getAnswersOfSingleQuestion(Long questionId) {
        forumQuestionRepository.findById(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question with id " + questionId + " does not exists."));

        List<ForumAnswer> answers = forumAnswerRepository.findByQuestionIdOrderByScoreDescCreatedAtDesc(questionId);
        answers.forEach(answer -> {
            answer.setScore(forumVoteRepository.getTotalVotesOfAnswer(answer.getId()));
        });
        return modelMapper.modelMap(answers, ForumAnswerDto.class);
    }

    public ResponseEntity<?> getAnswersNumberOfUser(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(forumAnswerRepository.getTotalNumberOfAnswersOfUser(userId));
    }
}
