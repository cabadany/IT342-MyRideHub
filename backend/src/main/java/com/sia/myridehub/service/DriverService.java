package com.sia.myridehub.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sia.myridehub.exception.ResourceNotFoundException;
import com.sia.myridehub.model.Driver;
import com.sia.myridehub.model.dto.DriverProfileDto;
import com.sia.myridehub.model.dto.DriverRegistrationDto;
import com.sia.myridehub.repository.DriverRepository;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DriverService(DriverRepository driverRepository, PasswordEncoder passwordEncoder) {
        this.driverRepository = driverRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Driver registerDriver(DriverRegistrationDto registrationDto) {
        // Check if mobile number already exists
        if (driverRepository.existsByMobileNumber(registrationDto.getMobileNumber())) {
            throw new IllegalArgumentException("Mobile number already registered");
        }

        // Check if terms are accepted
        if (!registrationDto.isTermsAccepted()) {
            throw new IllegalArgumentException("Terms and conditions must be accepted");
        }

        // Create new driver
        Driver driver = new Driver();
        driver.setFirstName(registrationDto.getFirstName());
        driver.setLastName(registrationDto.getLastName());
        driver.setMobileNumber(registrationDto.getMobileNumber());
        driver.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        driver.setCity(registrationDto.getCity());

        return driverRepository.save(driver);
    }

    public Driver getDriverById(Long id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + id));
    }

    public Driver getDriverByMobileNumber(String mobileNumber) {
        return driverRepository.findByMobileNumber(mobileNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with mobile number: " + mobileNumber));
    }

    public DriverProfileDto getDriverProfile(Long id) {
        Driver driver = getDriverById(id);
        return new DriverProfileDto(driver);
    }

    public Driver updateDriverLicense(Long id, String licenseNumber) {
        Driver driver = getDriverById(id);
        driver.setLicenseNumber(licenseNumber);
        driver.setUpdatedAt(LocalDateTime.now());
        return driverRepository.save(driver);
    }

    public String updateProfilePicture(Long id, MultipartFile file) throws IOException {
        Driver driver = getDriverById(id);

        // Directory for profile pictures
        String uploadDir = System.getProperty("user.dir") + "/uploads/driver-profiles/";

        // Ensure directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }

        // Generate a unique filename
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);

        // Save the file to the server
        try {
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new IOException("Failed to upload profile picture", e);
        }

        // Update the driver's profile picture
        driver.setProfilePicture(uploadDir + filename);
        driver.setUpdatedAt(LocalDateTime.now());
        driverRepository.save(driver);

        return driver.getProfilePicture();
    }
}