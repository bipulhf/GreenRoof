package com.bankrupted.greenroof.community.repository;

import com.bankrupted.greenroof.community.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
    List<CommunityComment> findByPostId(Long postId);

    void deleteByPostId(Long postId);
}
