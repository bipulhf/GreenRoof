package com.bankrupted.greenroof.community.repository;

import com.bankrupted.greenroof.community.entity.CommunityPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    Page<CommunityPost> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    Page<CommunityPost> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query(value = "SELECT *\n" +
            "FROM community_posts\n" +
            "WHERE community_ts @@ to_tsquery('english', :text)\n" +
            "ORDER BY ts_rank(community_ts, to_tsquery('english', :text)) DESC;", nativeQuery = true)
    List<CommunityPost> searchPost(String text);
}
