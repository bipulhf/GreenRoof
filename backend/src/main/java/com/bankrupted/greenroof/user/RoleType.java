package com.bankrupted.greenroof.user;

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
