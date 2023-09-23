package com.bankrupted.greenroof.community.Notification;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.repository.UserRepository;

import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

@Service
public class PushNotificationService {

    private final NotificationStorageRepository notificationStorageRepository;
    private final UserRepository userRepository;

    public PushNotificationService(NotificationStorageRepository notificationStorageRepository,
            UserRepository userRepository) {
        this.notificationStorageRepository = notificationStorageRepository;
        this.userRepository = userRepository;
    }

    private List<Notification> getNotifs(Long userID) {
        var notifs = notificationStorageRepository.findByUserToIdAndDeliveredFalse(userID);
        notifs.forEach(x -> x.setDelivered(true));
        notificationStorageRepository.saveAll(notifs);
        return notifs;
    }

    public Flux<ServerSentEvent<List<Notification>>> getNotificationsByUserToID(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("No user found with this username " + username + "."));
        Long userID = user.getId();
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
