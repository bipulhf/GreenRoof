package com.bankrupted.greenroof.repository.community;

import com.bankrupted.greenroof.entity.community.UserFollowing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommunityFollowingRepository extends JpaRepository<UserFollowing, Long> {
    Optional<UserFollowing> findByUserId(Long userId);

    @Query(value = "SELECT COUNT(followings_id) FROM user_followings WHERE user_id=:userId", nativeQuery = true)
    Long findTotalFollowingsNumber(Long userId);
}
