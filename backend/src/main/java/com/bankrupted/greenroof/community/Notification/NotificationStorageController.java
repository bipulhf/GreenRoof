package com.bankrupted.greenroof.community.Notification;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.NoSuchElementException;

@RequestMapping("api/v1/notification")
@RestController
@RequiredArgsConstructor
public class NotificationStorageController {

    private final NotificationStorageService notifService;
    private final UserRepository userRepository;

    @GetMapping("/{username}")
    public ResponseEntity<List<Notification>> getNotificationsByUserID(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        Long userID = user.getId();
        return new ResponseEntity<>(notifService.getNotificationsByUserID(userID), HttpStatus.OK);
    }

    // @GetMapping("/{username}")
    // public String getNotificationsByUserID(@PathVariable String username) {
    // return username;
    // }

    @PatchMapping("/read/{notifID}")
    public ResponseEntity changeNotifStatusToRead(@PathVariable Long notifID) {
        return ResponseEntity.ok(notifService.changeNotifStatusToRead(notifID));
    }

}
