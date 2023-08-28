package com.bankrupted.greenroof.repository.community;

import com.bankrupted.greenroof.entity.community.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByUserId(Long userId);

    List<CommunityPost> findAllByOrderByCreatedAtDesc();

    @Query(value = "SELECT *\n" +
            "FROM community_posts\n" +
            "WHERE community_ts @@ to_tsquery('english', :text)\n" +
            "ORDER BY ts_rank(community_ts, to_tsquery('english', :text)) DESC;", nativeQuery = true)
    List<CommunityPost> searchPost(String text);
}
