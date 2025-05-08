package com.sia.myridehub.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public DriverService(DriverRepository driverRepository, PasswordEncoder passwordEncoder) {
        this.driverRepository = driverRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new driver using a DTO
    public Driver registerDriver(DriverRegistrationDto registrationDto) {
        if (driverRepository.existsByMobileNumber(registrationDto.getMobileNumber())) {
            throw new IllegalArgumentException("Mobile number already registered");
        }
        if (!registrationDto.isTermsAccepted()) {
            throw new IllegalArgumentException("Terms and conditions must be accepted");
        }

        Driver driver = new Driver();
        driver.setFirstName(registrationDto.getFirstName());
        driver.setLastName(registrationDto.getLastName());
        driver.setMobileNumber(registrationDto.getMobileNumber());
        driver.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        driver.setCity(registrationDto.getCity());
        driver.setActive(true);
        driver.setAvailable(true);

        return driverRepository.save(driver);
    }

    // Save driver entity directly (used in controller POST)
    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // Get the first available driver
    public Optional<Driver> findAvailableDriver() {
        return driverRepository.findFirstByAvailableTrue();
    }

    // Find by ID
    public Driver getDriverById(Long id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + id));
    }

    // Find by mobile number
    public Driver getDriverByMobileNumber(String mobileNumber) {
        return driverRepository.findByMobileNumber(mobileNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with mobile number: " + mobileNumber));
    }

    // Find by email
    public Driver getDriverByEmail(String email) {
        return driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with email: " + email));
    }

    // Get full driver profile DTO
    public DriverProfileDto getDriverProfile(Long id) {
        Driver driver = getDriverById(id);
        return new DriverProfileDto(driver);
    }

    // Update license number
    public Driver updateDriverLicense(Long id, String licenseNumber) {
        Driver driver = getDriverById(id);
        driver.setLicenseNumber(licenseNumber);
        driver.setUpdatedAt(LocalDateTime.now());
        return driverRepository.save(driver);
    }

    // Update profile picture
    public String updateProfilePicture(Long id, MultipartFile file) throws IOException {
        Driver driver = getDriverById(id);
        String uploadDir = System.getProperty("user.dir") + "/uploads/driver-profiles/";

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);

        Files.copy(file.getInputStream(), filePath);

        driver.setProfilePicture(uploadDir + filename);
        driver.setUpdatedAt(LocalDateTime.now());
        driverRepository.save(driver);

        return driver.getProfilePicture();
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Optional<Driver> getAvailableDriver() {
        return driverRepository.findFirstByAvailableTrue();
    }    
}