package com.bankrupted.greenroof.community.Notification;

import com.bankrupted.greenroof.utils.GetUsername;
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

    @GetMapping("")
    public ResponseEntity<?> getNotificationsByUserID() {
        String username = GetUsername.get();
        Long userID = userRepository.findByUsername(username).get().getId();
        return new ResponseEntity<>(notifService.getNotificationsByUserID(userID), HttpStatus.OK);
    }

    @PatchMapping("/read/{notifID}")
    public ResponseEntity<?> changeNotifStatusToRead(@PathVariable Long notifID) {
        notifService.changeNotifStatusToRead(notifID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
