package com.sia.myridehub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sia.myridehub.config.JwtConfig;
import com.sia.myridehub.model.dto.AuthRequest;
import com.sia.myridehub.model.dto.AuthResponse;
import com.sia.myridehub.service.AdminService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtConfig jwtConfig;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(),
                    authRequest.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        UserDetails userDetails = adminService.loadUserByUsername(authRequest.getEmail());
        String jwt = jwtConfig.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}