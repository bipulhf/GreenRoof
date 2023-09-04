package com.bankrupted.greenroof.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class GetUsername {
    public static String get() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
