package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumAnswerRepository extends JpaRepository<ForumAnswer, Long> {
}
