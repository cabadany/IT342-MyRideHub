package com.sia.myridehub.model.dto;

import java.math.BigDecimal;

import com.sia.myridehub.model.Driver;

public class DriverProfileDto {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String licenseNumber;
    private String profilePicture;
    private Double rating;
    private Integer totalRides;
    private BigDecimal totalEarnings;
    private String city;

    public DriverProfileDto(Driver driver) {
        this.id = driver.getId();
        this.firstName = driver.getFirstName();
        this.lastName = driver.getLastName();
        this.mobileNumber = driver.getMobileNumber();
        this.licenseNumber = driver.getLicenseNumber();
        this.profilePicture = driver.getProfilePicture();
        this.rating = driver.getRating();
        this.totalRides = driver.getTotalRides();
        this.totalEarnings = driver.getTotalEarnings();
        this.city = driver.getCity();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getTotalRides() {
        return totalRides;
    }

    public void setTotalRides(Integer totalRides) {
        this.totalRides = totalRides;
    }

    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
}