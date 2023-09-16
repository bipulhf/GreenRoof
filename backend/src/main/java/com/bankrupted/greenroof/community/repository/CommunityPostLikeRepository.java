package com.bankrupted.greenroof.community.repository;

import com.bankrupted.greenroof.community.entity.CommunityPostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommunityPostLikeRepository extends JpaRepository<CommunityPostLike, Long> {
    @Query(value = "SELECT * FROM community_posts_likes WHERE post_id=:postId and liker_id=:likerId", nativeQuery = true)
    Optional<CommunityPostLike> findByPostIdAndLikerId(Long postId, Long likerId);

    @Query(value = "SELECT COUNT(id) FROM community_posts_likes WHERE post_id=:postId and liker_id=:likerId", nativeQuery = true)
    Integer existsByPostIdAndLikerId(Long postId, Long likerId);

    @Query(value = "SELECT COUNT(id) FROM community_posts_likes WHERE post_id=:postId", nativeQuery = true)
    Integer totalNumberOfLikes(Long postId);
}
