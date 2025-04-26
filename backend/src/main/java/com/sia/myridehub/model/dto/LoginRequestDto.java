package com.sia.myridehub.model.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequestDto {
    
    @NotBlank(message = "Username/Mobile number is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}