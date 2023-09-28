package com.bankrupted.greenroof.forum.repository;

import com.bankrupted.greenroof.forum.entity.ForumQuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumQuestionTagRepository extends JpaRepository<ForumQuestionTag, Long> {
    ForumQuestionTag findByTag(String tag);
}
