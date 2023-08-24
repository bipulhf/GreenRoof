package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForumQuestionRepository extends JpaRepository<ForumQuestion, Long> {
    Optional<ForumQuestion> findById(Integer id);
}
