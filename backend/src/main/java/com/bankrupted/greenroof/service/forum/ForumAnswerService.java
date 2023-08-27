package com.bankrupted.greenroof.service.forum;

import com.bankrupted.greenroof.dto.forum.ForumAnswerDto;
import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.forum.ForumAnswerRepository;
import com.bankrupted.greenroof.repository.forum.ForumQuestionRepository;
import com.bankrupted.greenroof.repository.forum.ForumVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumAnswerService {

    private final ForumAnswerRepository forumAnswerRepository;
    private final ForumQuestionRepository forumQuestionRepository;
    private final UserRepository userRepository;
    private final ForumVoteRepository forumVoteRepository;

    public ResponseEntity<?> addAnswerToQuestion(String username, Long questionId, ForumAnswer forumAnswer) {
        forumAnswer.setScore(0);
        forumAnswer.setAnswerer(userRepository.findByUsername(username).get());
        forumAnswer.setQuestion(forumQuestionRepository.findById(questionId).get());
        forumAnswer.setCreatedAt(new Date());
        forumAnswerRepository.save(forumAnswer);
        return new ResponseEntity<>("Added Answer", HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateForumQuestion(String username, Long answerId, ForumAnswer forumAnswer) {
        ForumAnswer prevAnswer = forumAnswerRepository.findById(answerId).get();
        forumAnswer.setQuestion(prevAnswer.getQuestion());
        forumAnswer.setAnswerer(prevAnswer.getAnswerer());
        forumAnswer.setId(answerId);
        forumAnswer.setCreatedAt(new Date());
        forumAnswerRepository.save(forumAnswer);
        return new ResponseEntity<>("Updated Answer", HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteAnswerOfQuestion(Long questionId) {
        if(forumAnswerRepository.findTop1ByQuestionId(questionId) == null)
            return new ResponseEntity<>("Question Not Found", HttpStatus.NOT_FOUND);;
        Long answerId = forumAnswerRepository.findTop1ByQuestionId(questionId).getId();
        Integer voteListSize = forumVoteRepository.findByAnswerId(answerId).size();
        if(voteListSize > 0) forumVoteRepository.deleteByAnswerId(answerId);
        forumAnswerRepository.deleteByQuestionId(questionId);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteAnswerOfQuestion(String username, Long answerId) {
        if(forumVoteRepository.findByAnswerId(answerId).size() > 0) forumVoteRepository.deleteByAnswerId(answerId);
        forumAnswerRepository.deleteById(answerId);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    public ResponseEntity<?> getAnswersOfSingleQuestion(Long questionId) {
        List<ForumAnswer> answer = forumAnswerRepository.findByQuestionIdOrderByScoreDescCreatedAtDesc(questionId);
        List<ForumAnswerDto> answerDtos = new ArrayList<>();

        answer.forEach(forumAnswer -> {
            forumAnswer.setScore(forumVoteRepository.getTotalVotesOfAnswer(forumAnswer.getId()));
            forumAnswerRepository.save(forumAnswer);

            ForumAnswerDto answerDto = ForumAnswerDto.builder()
                    .id(forumAnswer.getId())
                    .answerText(forumAnswer.getAnswerText())
                    .score(forumAnswer.getScore())
                    .answerer(forumAnswer.getAnswerer())
                    .createdAt(forumAnswer.getCreatedAt())
                    .build();

            answerDtos.add(answerDto);
        });
        return ResponseEntity.ok(answerDtos);
    }

    public ResponseEntity<?> getAnswersNumberOfUser(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(forumAnswerRepository.getTotalNumberOfAnswersOfUser(userId));
    }
}
