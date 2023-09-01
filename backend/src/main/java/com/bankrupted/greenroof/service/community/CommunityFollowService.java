package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.dto.community.UserFollowerDto;
import com.bankrupted.greenroof.dto.community.UserFollowingDto;
import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.entity.community.UserFollower;
import com.bankrupted.greenroof.entity.community.UserFollowing;
import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityFollowerRepository;
import com.bankrupted.greenroof.repository.community.CommunityFollowingRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CommunityFollowService {
    private final CommunityFollowerRepository communityFollowerRepository;
    private final CommunityFollowingRepository communityFollowingRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtility<UserFollower, UserFollowerDto> modelMapperFollower;
    private final ModelMapperUtility<UserFollowing, UserFollowingDto> modelMapperFollowing;

    public ResponseEntity<?> followUser(String user1, String user2) {
        User person1 = userRepository.findByUsername(user1)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + user1 + "."));
        User person2 = userRepository.findByUsername(user2)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + user2 + "."));

        if(person1 == person2)
            return new ResponseEntity<>("You can't follow yourself.", HttpStatus.FORBIDDEN);

        if(communityFollowerRepository.existsByUserIdAndFollowersId(person2.getId(), person1.getId()) > 0)
            return new ResponseEntity<>("Already Followed", HttpStatus.OK);

        setFollower(person1, person2);
        setFollowing(person2, person1);

        return new ResponseEntity<>("Followed successful", HttpStatus.CREATED);
    }

    public ResponseEntity<?> unfollowUser(String user1, String user2) {
        User person1 = userRepository.findByUsername(user1)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + user1 + "."));
        User person2 = userRepository.findByUsername(user2)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + user2 + "."));

        if(person1 == person2)
            return new ResponseEntity<>("You can't unfollow yourself.", HttpStatus.FORBIDDEN);

        if(communityFollowerRepository.existsByUserIdAndFollowersId(person2.getId(), person1.getId()) == 0)
            return new ResponseEntity<>("You can't unfollow the person.", HttpStatus.OK);

        communityFollowerRepository.deleteByUserId(person2.getId());
        communityFollowingRepository.deleteByUserId(person1.getId());

        return new ResponseEntity<>("Unfollowed successful", HttpStatus.CREATED);
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

    public List<UserFollowerDto> getFollowersList(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        List<UserFollower> userFollowers = communityFollowerRepository.findByUserId(userId);
        return modelMapperFollower.modelMap(userFollowers, UserFollowerDto.class);
    }

    public List<UserFollowingDto> getFollowingsList(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        List<UserFollowing> userFollowings = communityFollowingRepository.findByUserId(user.getId());
        return modelMapperFollowing.modelMap(userFollowings, UserFollowingDto.class);
    }

    public ResponseEntity<?> getTotalFollowersNumber(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        return ResponseEntity.ok(communityFollowerRepository.findTotalFollowersNumber(user.getId()));
    }

    public ResponseEntity<?> getTotalFollowingsNumber(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        return ResponseEntity.ok(communityFollowingRepository.findTotalFollowingsNumber(user.getId()));
    }
}
