package com.bankrupted.greenroof.user.entity;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

@RequiredArgsConstructor
public enum RoleType {

        USER(),
        ADMIN();

        public List<SimpleGrantedAuthority> getAuthorities() {
                return List.of(new SimpleGrantedAuthority(this.name()));
        }
}
