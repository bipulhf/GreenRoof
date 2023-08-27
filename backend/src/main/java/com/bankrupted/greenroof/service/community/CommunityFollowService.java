package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.community.UserFollower;
import com.bankrupted.greenroof.entity.community.UserFollowing;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityFollowerRepository;
import com.bankrupted.greenroof.repository.community.CommunityFollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CommunityFollowService {
    private final CommunityFollowerRepository communityFollowerRepository;
    private final CommunityFollowingRepository communityFollowingRepository;
    private final UserRepository userRepository;

    public ResponseEntity<?> followUser(String user1, String user2) {
        User person1 = userRepository.findByUsername(user1).get();
        User person2 = userRepository.findByUsername(user2).get();

        if(communityFollowerRepository.existsByUserIdAndFollowersId(person2.getId(), person1.getId()) > 0)
            return new ResponseEntity<>("Already Followed", HttpStatus.OK);

        setFollower(person1, person2);
        setFollowing(person2, person1);

        return new ResponseEntity<>("Followed successful", HttpStatus.CREATED);
    }

    private void setFollowing(User person2, User person1) {
        UserFollowing following = new UserFollowing();
        following.setUser(person1);
        following.setFollowing(person2);
        following.setCreatedAt(new Date());
        communityFollowingRepository.save(following);
    }

    private void setFollower(User person1, User person2) {
        UserFollower follower = new UserFollower();
        follower.setUser(person2);
        follower.setFollower(person1);
        follower.setCreatedAt(new Date());
        communityFollowerRepository.save(follower);
    }

    public ResponseEntity<?> getFollowersList(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(communityFollowerRepository.findByUserId(userId));
    }

    public ResponseEntity<?> getFollowingsList(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(communityFollowingRepository.findByUserId(userId));
    }

    public ResponseEntity<?> getTotalFollowersNumber(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(communityFollowerRepository.findTotalFollowersNumber(userId));
    }

    public ResponseEntity<?> getTotalFollowingsNumber(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(communityFollowingRepository.findTotalFollowingsNumber(userId));
    }
}
