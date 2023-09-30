package com.bankrupted.greenroof.community.Notification;

import com.bankrupted.greenroof.community.entity.CommunityPost;
import com.bankrupted.greenroof.user.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private NotificationType notificationType;
    private boolean delivered;
    private boolean read;
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private CommunityPost communityPost;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_to_id")
    private User userTo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_from_id")
    private User userFrom;

}
