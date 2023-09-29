package com.bankrupted.greenroof.forum.repository;

import com.bankrupted.greenroof.forum.entity.ForumQuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumQuestionTagRepository extends JpaRepository<ForumQuestionTag, Long> {
    ForumQuestionTag findByTag(String tag);

    @Override
    @Query(value = "SELECT * FROM forum_question_tag LIMIT 12", nativeQuery = true)
    List<ForumQuestionTag> findAll();
}
