package com.bankrupted.greenroof.entity.forum;

import com.bankrupted.greenroof.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@Table(name = "forum_questions")
public class ForumQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Question title is mandatory and can't be blank.")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionTitle;
    @NotBlank(message = "Question body is mandatory and can't be blank.")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionText;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User questioner;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "question_category",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<ForumQuestionCategory> questionCategory;
}
