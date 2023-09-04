package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.forum.ForumQuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumQuestionCategoryRepository extends JpaRepository<ForumQuestionCategory, Long> {
}
