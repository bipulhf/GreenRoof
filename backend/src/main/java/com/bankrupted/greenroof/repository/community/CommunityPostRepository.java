package com.bankrupted.greenroof.repository.community;

import com.bankrupted.greenroof.entity.community.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByUserId(Long userId);
}
