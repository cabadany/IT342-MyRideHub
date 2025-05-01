package com.sia.myridehub.model.dto;

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

    public String getToken() {
        return token;
    }

    public Long getDriverId() {
        return driverId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}