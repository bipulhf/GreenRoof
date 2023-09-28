package com.bankrupted.greenroof.forum.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "forum_question_tag")
public class ForumQuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String questionTag;
}
