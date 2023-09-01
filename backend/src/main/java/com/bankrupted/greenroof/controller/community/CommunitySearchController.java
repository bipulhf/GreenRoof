package com.bankrupted.greenroof.controller.community;

import com.bankrupted.greenroof.service.community.CommunitySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        return new ResponseEntity<>(communitySearchService.searchByUsername(username), HttpStatus.OK);
    }

    @GetMapping("post")
    public ResponseEntity<?> searchCommunityPost(@RequestParam String text) {
        return new ResponseEntity<>(communitySearchService.searchCommunityPost(text), HttpStatus.OK);
    }
}
