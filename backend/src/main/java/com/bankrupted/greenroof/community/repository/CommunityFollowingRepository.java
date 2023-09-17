package com.bankrupted.greenroof.community.repository;

import com.bankrupted.greenroof.community.entity.UserFollowing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityFollowingRepository extends JpaRepository<UserFollowing, Long> {
    List<UserFollowing> findByUserId(Long userId);

    @Query(value = "SELECT COUNT(followings_id) FROM user_followings WHERE user_id=:userId", nativeQuery = true)
    Integer findTotalFollowingsNumber(Long userId);

    void deleteByUserId(Long userId);
}
