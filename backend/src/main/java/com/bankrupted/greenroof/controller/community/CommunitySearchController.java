package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.service.community.CommunitySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/community/search")
@RequiredArgsConstructor
public class CommunitySearchController {
    private final CommunitySearchService communitySearchService;
    @GetMapping("user")
    public ResponseEntity<?> searchByUsername(@RequestParam String username) {
        return communitySearchService.searchByUsername(username);
    }

    @GetMapping("post")
    public ResponseEntity<?> searchCommunityPost(@RequestParam String text) {
        return communitySearchService.searchCommunityPost(text);
    }
}
