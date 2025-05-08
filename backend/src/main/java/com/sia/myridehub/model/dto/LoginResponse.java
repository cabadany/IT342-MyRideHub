package com.sia.myridehub.model.dto;

import com.sia.myridehub.model.User;

public class LoginResponse {
    private String token;
    private Long id;               // ✅ Add this line
    private String email;
    private String fullName;
    private String username;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.id = user.getId();    // ✅ Set user ID
        this.email = user.getEmail();
        this.fullName = user.getFullName() != null ? user.getFullName() : "Unknown";
        this.username = user.getUsername() != null ? user.getUsername() : "unknown";
    }

    public String getToken() {
        return token;
    }

    public Long getId() {          // ✅ Getter for ID
        return id;
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