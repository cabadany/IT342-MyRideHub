package com.sia.myridehub.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sia.myridehub.model.Driver;
import com.sia.myridehub.model.HelpTicket;
import com.sia.myridehub.model.dto.HelpTicketDto;
import com.sia.myridehub.service.DriverService;
import com.sia.myridehub.service.HelpTicketService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "*")
public class HelpController {

    private final HelpTicketService helpTicketService;
    private final DriverService driverService;

    public HelpController(HelpTicketService helpTicketService, DriverService driverService) {
        this.helpTicketService = helpTicketService;
        this.driverService = driverService;
    }

    @PostMapping
    public ResponseEntity<?> createHelpTicket(
            Authentication authentication,
            @Valid @RequestBody HelpTicketDto helpTicketDto) {
        try {
            String email = authentication.getName(); // ✅ Correct: get the authenticated user's email
            Driver driver = driverService.getDriverByEmail(email); // ✅ find driver by email
            Long driverId = driver.getId();
            
            HelpTicket helpTicket = helpTicketService.createHelpTicket(driverId, helpTicketDto);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Help ticket created successfully");
            response.put("ticketId", helpTicket.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to create help ticket: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> getDriverHelpTickets(Authentication authentication) {
        try {
            String email = authentication.getName(); // ✅ Correct: get the authenticated user's email
            Driver driver = driverService.getDriverByEmail(email); // ✅ find driver by email
            Long driverId = driver.getId();

            List<HelpTicket> tickets = helpTicketService.getDriverHelpTickets(driverId);

            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to retrieve help tickets: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}