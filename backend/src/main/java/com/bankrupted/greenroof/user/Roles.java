package com.bankrupted.greenroof.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(nullable = false)
    @ManyToMany(mappedBy = "userRole", fetch = FetchType.EAGER)
    private Set<User> user;
}