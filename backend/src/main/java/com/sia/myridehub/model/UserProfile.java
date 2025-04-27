package com.sia.myridehub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String emergencyContact;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String profilePictureUrl; // (optional for now)

    public UserProfile() {}

    public UserProfile(Long id, String fullName, String email, String phone, String address,
                       String emergencyContact, String username, String password, String profilePictureUrl) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.emergencyContact = emergencyContact;
        this.username = username;
        this.password = password;
        this.profilePictureUrl = profilePictureUrl;
    }

    // getters and setters...
    // (Generate automatically using your IDE like IntelliJ or VS Code!)
}
