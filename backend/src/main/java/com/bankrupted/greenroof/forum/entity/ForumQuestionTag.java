package com.bankrupted.greenroof.forum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "forum_question_tag")
public class ForumQuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String tag;
    @ManyToMany(mappedBy = "questionTag")
    private List<ForumQuestion> forumQuestions;
}
