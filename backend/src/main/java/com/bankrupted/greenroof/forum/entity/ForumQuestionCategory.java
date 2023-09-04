package com.bankrupted.greenroof.forum.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "forum_question_category")
public class ForumQuestionCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private QuestionCategoryType questionCategory;
}
