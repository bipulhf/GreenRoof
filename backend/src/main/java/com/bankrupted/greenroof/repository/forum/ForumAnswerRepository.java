package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumAnswerRepository extends JpaRepository<ForumAnswer, Long> {
    ForumAnswer findTop1ByQuestionId(Long questionId);
    List<ForumAnswer> findByQuestionIdOrderByScoreDescCreatedAtDesc(Long questionId);
    void deleteByQuestionId(Long questionId);
}
