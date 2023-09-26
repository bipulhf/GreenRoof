package com.bankrupted.greenroof.community.service;

import com.bankrupted.greenroof.community.dto.UserFollowerDto;
import com.bankrupted.greenroof.community.dto.UserFollowingDto;
import com.bankrupted.greenroof.exception.GenericException;
import com.bankrupted.greenroof.user.dto.UserProfileDto;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.community.entity.UserFollower;
import com.bankrupted.greenroof.community.entity.UserFollowing;
import com.bankrupted.greenroof.user.repository.UserRepository;
import com.bankrupted.greenroof.community.repository.CommunityFollowerRepository;
import com.bankrupted.greenroof.community.repository.CommunityFollowingRepository;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

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
            throw new GenericException("You can't follow yourself.");

        if(communityFollowerRepository.existsByUserIdAndFollowersId(person2.getId(), person1.getId()) > 0)
            throw new GenericException("Already Followed");

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
            throw new GenericException("You can't unfollow yourself.");

        if(communityFollowerRepository.existsByUserIdAndFollowersId(person2.getId(), person1.getId()) == 0)
            throw new GenericException("You can't unfollow the person.");

        communityFollowerRepository.deleteByUserId(person2.getId());
        communityFollowingRepository.deleteByUserId(person1.getId());

        return new ResponseEntity<>("Unfollowed successful", HttpStatus.CREATED);
    }

    public Map<String, Boolean> isFollowerOfUser(String user1, String user2) {
        User person1 = userRepository.findByUsername(user1)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + user1 + "."));
        User person2 = userRepository.findByUsername(user2)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + user2 + "."));
        Map<String, Boolean> mp = new HashMap<>();
        if(communityFollowerRepository.existsByUserIdAndFollowersId(person2.getId(), person1.getId()) > 0) mp.put("isFollow", true);
        else mp.put("isFollow", false);
        return mp;
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

    public Map getTotalFollowersNumber(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        Map<String, Integer> mp = new HashMap<>();
        mp.put("total", communityFollowerRepository.findTotalFollowersNumber(user.getId()));
        return mp;
    }

    public Map getTotalFollowingsNumber(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        Map<String, Integer> mp = new HashMap<>();
        mp.put("total", communityFollowingRepository.findTotalFollowingsNumber(user.getId()));
        return mp;
    }

    public List<UserProfileDto> whoToFollow(String username) {
        List<Long> userId = new ArrayList<>();
        userId.add(userRepository.findByUsername(username).get().getId());
        getFollowingsList(username).forEach(userFollowingDto -> userId.add(userFollowingDto.getFollowing().getId()));
        List<User> userList = userRepository.getRecommendation(userId);
        List<UserProfileDto> userProfileDtos = new ArrayList<>();
        userList.forEach(user -> {
            if(!user.isBanned()){
                UserProfileDto userProfileDto = UserProfileDto.builder()
                        .id(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .username(user.getUsername())
                        .city(user.getCity())
                        .score(user.getScore())
                        .profilePhoto(user.getProfilePhoto())
                        .isBanned(user.isBanned())
                        .role(user.getRole())
                        .createdAt(user.getCreatedAt())
                        .build();
                userProfileDtos.add(userProfileDto);
            }
        });
        return userProfileDtos;
    }
}
