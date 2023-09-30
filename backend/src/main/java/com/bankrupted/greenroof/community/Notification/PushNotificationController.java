package com.bankrupted.greenroof.community.Notification;

import java.util.List;

import com.bankrupted.greenroof.community.dto.NotificationDto;
import com.bankrupted.greenroof.utils.GetUsername;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/v1/push-notifications")

public class PushNotificationController {

    private final PushNotificationService service;

    public PushNotificationController(PushNotificationService service) {
        this.service = service;
    }

    @GetMapping("")
    public Flux<ServerSentEvent<List<NotificationDto>>> streamLastMessage() {
        String username = GetUsername.get();
        return service.getNotificationsByUserToID(username);
    }

}
