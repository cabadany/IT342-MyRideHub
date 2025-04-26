package com.sia.myridehub.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sia.myridehub.model.dto.DriverProfileDto;
import com.sia.myridehub.service.DriverService;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {
    
    private final DriverService driverService;
    
    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }
    
    @GetMapping("/profile")
    public ResponseEntity<DriverProfileDto> getDriverProfile(Authentication authentication) {
        String mobileNumber = authentication.getName();
        Long driverId = driverService.getDriverByMobileNumber(mobileNumber).getId();
        DriverProfileDto profile = driverService.getDriverProfile(driverId);
        return ResponseEntity.ok(profile);
    }
    
    @PutMapping("/profile/license")
    public ResponseEntity<?> updateDriverLicense(
            Authentication authentication,
            @RequestParam String licenseNumber) {
        try {
            String mobileNumber = authentication.getName();
            Long driverId = driverService.getDriverByMobileNumber(mobileNumber).getId();
            driverService.updateDriverLicense(driverId, licenseNumber);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "License number updated successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    @PostMapping("/profile/picture")
    public ResponseEntity<?> updateProfilePicture(
            Authentication authentication,
            @RequestParam("file") MultipartFile file) {
        try {
            String mobileNumber = authentication.getName();
            Long driverId = driverService.getDriverByMobileNumber(mobileNumber).getId();
            String profilePicturePath = driverService.updateProfilePicture(driverId, file);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Profile picture updated successfully");
            response.put("profilePicture", profilePicturePath);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to upload profile picture: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}