package com.sia.myridehub.model.dto;

import com.sia.myridehub.model.User;

public class LoginResponse {
    private String token;
    private String email;
    private String fullName;
    private String username;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.email = user.getEmail();
        this.fullName = user.getFullName() != null ? user.getFullName() : "Unknown";
        this.username = user.getUsername() != null ? user.getUsername() : "unknown";
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }
}