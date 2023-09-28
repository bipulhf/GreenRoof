package com.bankrupted.greenroof.community.Notification;

import java.util.Date;
import java.util.List;

import com.bankrupted.greenroof.community.dto.NotificationDto;
import com.bankrupted.greenroof.community.entity.CommunityPost;
import com.bankrupted.greenroof.utils.ModelMapperUtility;
import org.springframework.stereotype.Service;

import com.bankrupted.greenroof.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class NotificationStorageService {

    private final NotificationStorageRepository notifRepository;
    private final ModelMapperUtility<Notification, NotificationDto> modelMapperUtility;

    public Notification createNotificationStorage(User postUser, User reactUser, CommunityPost communityPost, NotificationType notificationType) {

        Notification notification = Notification.builder()
                .delivered(false)
                .content("You got a " + notificationType + " from " + reactUser.getUsername())
                .notificationType(notificationType)
                .communityPost(communityPost)
                .userFrom(reactUser)
                .userTo(postUser)
                .createdAt(new Date())
                .build();
        return notifRepository.save(notification);
    }

    public Notification getNotificationsByID(Long id) {
        return notifRepository.findById(id).orElseThrow(() -> new RuntimeException("notification not found!"));
    }

    public List<Notification> getNotificationsByUserIDNotRead(Long userID) {
        return notifRepository.findByUserToIdAndDeliveredFalse(userID);
    }

    public List<NotificationDto> getNotificationsByUserID(Long userID) {
        return modelMapperUtility.modelMap(notifRepository.findByUserToIdOrderByCreatedAtDesc(userID), NotificationDto.class);
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
