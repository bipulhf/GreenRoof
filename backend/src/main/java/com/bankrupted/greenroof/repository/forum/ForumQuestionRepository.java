package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumQuestionRepository extends JpaRepository<ForumQuestion, Long> {
    @Query(value = "SELECT * FROM forum_questions ques WHERE ques.user_id=:Id", nativeQuery = true)
    List<ForumQuestion> findByUserIdOrderByCreatedAtDesc(Long Id);

    Optional<ForumQuestion> findByIdOrderByCreatedAtDesc(long l);

    Page<ForumQuestion> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query(value = "SELECT *\n" +
            "FROM forum_questions\n" +
            "WHERE forum_ts @@ to_tsquery('english', :text)\n" +
            "ORDER BY ts_rank(forum_ts, to_tsquery('english', :text)) DESC;", nativeQuery = true)
    List<ForumQuestion> searchQuestion(String text);
}
