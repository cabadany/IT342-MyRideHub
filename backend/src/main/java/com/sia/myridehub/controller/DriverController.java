package com.sia.myridehub.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sia.myridehub.model.Driver;
import com.sia.myridehub.model.dto.DriverProfileDto;
import com.sia.myridehub.service.DriverService;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    private final DriverService driverService;
    private final PasswordEncoder passwordEncoder;

    public DriverController(DriverService driverService, PasswordEncoder passwordEncoder) {
        this.driverService = driverService;
        this.passwordEncoder = passwordEncoder;
    }

    // POST /api/drivers - Register a driver
    @PostMapping
    public ResponseEntity<?> registerDriver(@RequestBody Driver driver) {
        driver.setAvailable(true);
        driver.setActive(true);
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        Driver saved = driverService.saveDriver(driver);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Driver registered successfully");
        response.put("driverId", saved.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /api/drivers - Get profile of the authenticated driver
    @GetMapping
    public ResponseEntity<DriverProfileDto> getDriverProfile(Authentication authentication) {
        String mobileNumber = authentication.getName();
        Long driverId = driverService.getDriverByMobileNumber(mobileNumber).getId();
        DriverProfileDto profile = driverService.getDriverProfile(driverId);
        return ResponseEntity.ok(profile);
    }

    // GET /api/drivers/all - Get all drivers
    @GetMapping("/all")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableDriver() {
        return driverService.getAvailableDriver()
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available drivers"));
    }      

    // PUT /api/drivers/profile/license - Update driver license
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

    // POST /api/drivers/profile/picture - Upload profile picture
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