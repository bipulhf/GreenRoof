package com.bankrupted.greenroof.community.Notification;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

@Service
public class PushNotificationService {

    private final NotificationStorageRepository notificationStorageRepository;

    public PushNotificationService(NotificationStorageRepository notificationStorageRepository) {
        this.notificationStorageRepository = notificationStorageRepository;
    }

    private List<Notification> getNotifs(Long userID) {
        var notifs = notificationStorageRepository.findByUserToIdAndDeliveredFalse(userID);
        notifs.forEach(x -> x.setDelivered(true));
        notificationStorageRepository.saveAll(notifs);
        return notifs;
    }

    public Flux<ServerSentEvent<List<Notification>>> getNotificationsByUserToID(Long userID) {

        if (userID != null) {
            return Flux.interval(Duration.ofSeconds(1))
                    .publishOn(Schedulers.boundedElastic())
                    .map(sequence -> ServerSentEvent.<List<Notification>>builder().id(String.valueOf(sequence))
                            .event("user-list-event").data(getNotifs(userID))
                            .build());
        }

        return Flux.interval(Duration.ofSeconds(1)).map(sequence -> ServerSentEvent.<List<Notification>>builder()
                .id(String.valueOf(sequence)).event("user-list-event").data(new ArrayList<>()).build());
    }
}
