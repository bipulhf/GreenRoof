package com.bankrupted.greenroof.forum.repository;

import com.bankrupted.greenroof.forum.entity.ForumQuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumQuestionCategoryRepository extends JpaRepository<ForumQuestionCategory, Long> {
}
