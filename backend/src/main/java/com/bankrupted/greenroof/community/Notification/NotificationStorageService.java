package com.bankrupted.greenroof.community.Notification;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class NotificationStorageService {

    private final NotificationStorageRepository notifRepository;

    public Notification createNotificationStorage(Notification notificationStorage) {
        return notifRepository.save(notificationStorage);
    }

    public Notification getNotificationsByID(Long id) {
        return notifRepository.findById(id).orElseThrow(() -> new RuntimeException("notification not found!"));
    }

    public List<Notification> getNotificationsByUserIDNotRead(Long userID) {
        return notifRepository.findByUserToIdAndDeliveredFalse(userID);
    }

    public List<Notification> getNotificationsByUserID(Long userID) {
        return notifRepository.findByUserToId(userID);
    }

    public Notification changeNotifStatusToRead(Long notifID) {
        var notif = notifRepository.findById(notifID)
                .orElseThrow(() -> new RuntimeException("not found!"));
        notif.setRead(true);
        return notifRepository.save(notif);
    }

    public void clear() {
        notifRepository.deleteAll();
    }
}
