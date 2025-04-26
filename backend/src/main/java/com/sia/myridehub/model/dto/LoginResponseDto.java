package com.sia.myridehub.model;

public class LoginResponseDto {
    
    private String token;
    private Long driverId;
    private String firstName;
    private String lastName;
    
    public LoginResponseDto(String token, Long driverId, String firstName, String lastName) {
        this.token = token;
        this.driverId = driverId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}