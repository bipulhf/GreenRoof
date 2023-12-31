package com.bankrupted.greenroof.forum.entity;

import com.bankrupted.greenroof.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
import java.util.List;
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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ForumAttatchment> forumAttatchments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User questioner;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "forum_question_forum_tag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<ForumQuestionTag> questionTag;
}
