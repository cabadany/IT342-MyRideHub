package com.sia.myridehub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sia.myridehub.model.UserProfile;
import com.sia.myridehub.service.UserProfileService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping("/profile")
    public ResponseEntity<String> createOrUpdateProfile(@RequestBody UserProfile userProfile) {
        userProfileService.saveUserProfile(userProfile);
        return ResponseEntity.ok("Profile saved successfully!");
    }
}
