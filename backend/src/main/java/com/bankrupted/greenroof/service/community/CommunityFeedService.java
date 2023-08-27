package com.bankrupted.greenroof.service.community;

import com.bankrupted.greenroof.repository.UserRepository;
import com.bankrupted.greenroof.repository.community.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityFeedService {

    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;

    public ResponseEntity<?> getAllCommunityPosts() {
        return ResponseEntity.ok(communityPostRepository.findAll());
    }

    public ResponseEntity<?> getSingleCommunityPost(Long id) {
        return ResponseEntity.ok(communityPostRepository.findById(id));
    }

    public ResponseEntity<?> getUserCommunityPost(String username) {
        Long userId = userRepository.findByUsername(username).get().getId();
        return ResponseEntity.ok(communityPostRepository.findByUserId(userId));
    }
}
