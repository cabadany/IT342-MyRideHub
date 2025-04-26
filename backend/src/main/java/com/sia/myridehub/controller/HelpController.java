package com.sia.myridehub.controller;

import com.sia.myridehub.model.HelpTicket;
import com.sia.myridehub.model.dto.HelpTicketDto;
import com.sia.myridehub.service.DriverService;
import com.sia.myridehub.service.HelpTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "*")
public class HelpController {

    private final HelpTicketService helpTicketService;
    private final DriverService driverService;

    @Autowired
    public HelpController(HelpTicketService helpTicketService, DriverService driverService) {
        this.helpTicketService = helpTicketService;
        this.driverService = driverService;
    }

    // Create a new help ticket
    @PostMapping
    public ResponseEntity<?> createHelpTicket(
            Authentication authentication,
            @Valid @RequestBody HelpTicketDto helpTicketDto) {
        try {
            String mobileNumber = authentication.getName(); // Get the authenticated driver's mobile number
            
            // Get driver ID by mobile number, throw exception if not found
            Driver driver = driverService.getDriverByMobileNumber(mobileNumber);
            Long driverId = driver.getId();
            
            // Create a help ticket using the service
            HelpTicket helpTicket = helpTicketService.createHelpTicket(driverId, helpTicketDto);

            // Prepare success response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Help ticket created successfully");
            response.put("ticketId", helpTicket.getId()); // Include ticket ID in the response

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // Log the error if needed
            e.printStackTrace();

            // Return a response with error message
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to create help ticket: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Retrieve all help tickets for the authenticated driver
    @GetMapping
    public ResponseEntity<List<HelpTicket>> getDriverHelpTickets(Authentication authentication) {
        try {
            String mobileNumber = authentication.getName(); // Get the authenticated driver's mobile number
            
            // Get driver ID by mobile number, throw exception if not found
            Driver driver = driverService.getDriverByMobileNumber(mobileNumber);
            Long driverId = driver.getId();

            // Retrieve the list of help tickets for this driver
            List<HelpTicket> tickets = helpTicketService.getDriverHelpTickets(driverId);

            // Return the list of help tickets
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            // Log the error if needed
            e.printStackTrace();

            // Return a response with error message
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to retrieve help tickets: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}