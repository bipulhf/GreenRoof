package com.bankrupted.greenroof.forum.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "forum_attatchments")
public class ForumAttatchment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String link;
}
