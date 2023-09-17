package com.bankrupted.greenroof.community.repository;

import com.bankrupted.greenroof.community.entity.CommunityComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
    Page<CommunityComment> findByPostIdOrderByCreatedAtDesc(Long postId, Pageable pageable);

    void deleteByPostId(Long postId);

    @Query(value = "SELECT COUNT(id) FROM community_posts_comments WHERE post_id=:postId", nativeQuery = true)
    Integer getNumberOfComments(Long postId);
}
