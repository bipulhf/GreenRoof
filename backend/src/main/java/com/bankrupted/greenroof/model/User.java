package com.bankrupted.greenroof.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private boolean isBanned;

    @Column(nullable = false)
    private byte[] profilePhoto;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<UserRoles> roles;

    @OneToMany(mappedBy = "community_posts")
    private Set<CommunityPost> posts = new HashSet<>();
    @OneToMany(mappedBy = "community_comments")
    private Set<CommunityComments> comments = new HashSet<>();

    @OneToMany(mappedBy = "forum_questions")
    private Set<ForumQuestions> questions = new HashSet<>();

    @OneToMany(mappedBy = "forum_answers")
    private Set<ForumAnswers> answers = new HashSet<>();

    @OneToMany(mappedBy = "user_tokens")
    private Set<UserTokens> tokens = new HashSet<>();

    // Bipul will implement Follows Model
}