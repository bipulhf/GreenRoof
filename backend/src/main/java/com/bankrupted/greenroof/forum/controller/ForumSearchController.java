package com.bankrupted.greenroof.forum.controller;

import com.bankrupted.greenroof.forum.service.ForumSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/forum/search")
@RequiredArgsConstructor
public class ForumSearchController {
    private final ForumSearchService forumSearchService;
    @GetMapping("user")
    public ResponseEntity<?> searchByUsername(@RequestParam String username) {
        return new ResponseEntity<>(forumSearchService.searchByUsername(username), HttpStatus.OK);
    }

    @GetMapping("post")
    public ResponseEntity<?> searchCommunityPost(@RequestParam String text) {
        return new ResponseEntity<>(forumSearchService.searchCommunityPost(text), HttpStatus.OK);
    }
}
