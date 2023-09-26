package com.bankrupted.greenroof.community.Notification;

import com.bankrupted.greenroof.user.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_to_id")
    private User userTo;

    private NotificationType notificationType;
    private boolean delivered;
    private boolean read;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_from_id")
    private User userFrom;

}
