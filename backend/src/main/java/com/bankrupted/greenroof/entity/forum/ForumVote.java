package com.bankrupted.greenroof.entity.forum;

import com.bankrupted.greenroof.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "forum_votes")
public class ForumVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long vote;
    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate createdAt;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "voter_id", nullable = false)
    private User user;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "answerer_id", nullable = false)
    private ForumAnswer answer;
}
