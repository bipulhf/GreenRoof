package com.bankrupted.greenroof.entity;

import com.bankrupted.greenroof.entity.forum.ForumAnswer;
import com.bankrupted.greenroof.entity.forum.ForumQuestion;
import com.bankrupted.greenroof.entity.forum.ForumVote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private boolean isBanned;
    private String profilePhoto;
    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate createdAt;

    @JsonIgnore
    @ManyToMany (fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Roles> userRole;
}
