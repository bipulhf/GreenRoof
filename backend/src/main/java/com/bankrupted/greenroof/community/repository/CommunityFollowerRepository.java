package com.bankrupted.greenroof.community.repository;

import com.bankrupted.greenroof.community.entity.UserFollower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityFollowerRepository extends JpaRepository<UserFollower, Long> {
    List<UserFollower> findByUserId(Long userId);

    @Query(value = "SELECT COUNT(followers_id) FROM user_followers WHERE user_id=:userId AND followers_id=:followersId", nativeQuery = true)
    Long existsByUserIdAndFollowersId(Long userId, Long followersId);

    @Query(value = "SELECT COUNT(followers_id) FROM user_followers WHERE user_id=:userId", nativeQuery = true)
    Integer findTotalFollowersNumber(Long userId);

    void deleteByUserId(Long userId);
}
