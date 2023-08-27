package com.bankrupted.greenroof.repository.community;

import com.bankrupted.greenroof.entity.community.UserFollower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommunityFollowerRepository extends JpaRepository<UserFollower, Long> {
    Optional<UserFollower> findByUserId(Long userId);

    @Query(value = "SELECT COUNT(followers_id) FROM user_followers WHERE user_id=:userId AND followers_id=:followersId", nativeQuery = true)
    Long existsByUserIdAndFollowersId(Long userId, Long followersId);

    @Query(value = "SELECT COUNT(followers_id) FROM user_followers WHERE user_id=:userId", nativeQuery = true)
    Long findTotalFollowersNumber(Long userId);
}
