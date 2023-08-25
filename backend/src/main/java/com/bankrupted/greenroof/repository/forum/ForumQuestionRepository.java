package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumQuestionRepository extends JpaRepository<ForumQuestion, Long> {
    @Query(value = "SELECT * from forum_questions ques WHERE ques.user_id=:Id", nativeQuery = true)
    List<ForumQuestion> findByUserId(Long Id);
}
