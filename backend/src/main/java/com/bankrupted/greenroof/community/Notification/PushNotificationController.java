package com.bankrupted.greenroof.community.Notification;

import java.util.List;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/push-notifications")

public class PushNotificationController {

    private final PushNotificationService service;

    public PushNotificationController(PushNotificationService service) {
        this.service = service;
    }

    @GetMapping("/{username}")
    public Flux<ServerSentEvent<List<Notification>>> streamLastMessage(@PathVariable String username) {
        return service.getNotificationsByUserToID(username);
    }

}
