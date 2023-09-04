package com.bankrupted.greenroof.forum.repository;

import com.bankrupted.greenroof.forum.entity.ForumAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumAnswerRepository extends JpaRepository<ForumAnswer, Long> {
    Boolean existsByQuestionId(Long questionId);
    List<ForumAnswer> findByQuestionIdOrderByScoreDescCreatedAtDesc(Long questionId);

    @Query(value = "SELECT SUM(user_id) FROM forum_answers WHERE user_id=:userId", nativeQuery = true)
    Long getTotalNumberOfAnswersOfUser(Long userId);

    void deleteByQuestionId(Long questionId);
}
