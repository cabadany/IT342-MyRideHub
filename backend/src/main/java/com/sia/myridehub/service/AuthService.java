package com.sia.myridehub.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.sia.myridehub.config.JwtTokenProvider;
import com.sia.myridehub.model.Driver;
import com.sia.myridehub.model.dto.LoginRequestDto;
import com.sia.myridehub.model.dto.LoginResponseDto;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final DriverService driverService;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, DriverService driverService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.driverService = driverService;
    }

    public LoginResponseDto login(LoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication.getName());

        Driver driver = driverService.getDriverByMobileNumber(loginRequest.getUsername());

        return new LoginResponseDto(jwt, driver.getId(), driver.getFirstName(), driver.getLastName());
    }
}