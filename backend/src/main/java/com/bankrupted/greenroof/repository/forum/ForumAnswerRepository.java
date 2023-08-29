package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumAnswerRepository extends JpaRepository<ForumAnswer, Long> {
    Optional<ForumAnswer> findTop1ByQuestionId(Long questionId);
    List<ForumAnswer> findByQuestionIdOrderByScoreDescCreatedAtDesc(Long questionId);

    @Query(value = "SELECT SUM(user_id) FROM forum_answers WHERE user_id=:userId", nativeQuery = true)
    Long getTotalNumberOfAnswersOfUser(Long userId);

    void deleteByQuestionId(Long questionId);
}
