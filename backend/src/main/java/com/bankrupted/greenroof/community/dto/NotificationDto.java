package com.bankrupted.greenroof.community.dto;

import com.bankrupted.greenroof.community.Notification.NotificationType;
import com.bankrupted.greenroof.user.dto.UserProfileDto;
import com.bankrupted.greenroof.user.entity.User;
import lombok.Data;

import java.util.Date;

@Data
public class NotificationDto {
    private Long id;
    private String content;
    private NotificationType notificationType;
    private boolean delivered;
    private boolean read;
    private UserProfileDto userFrom;
    private CommunityPostDto communityPost;
    private Date createdAt;
}
