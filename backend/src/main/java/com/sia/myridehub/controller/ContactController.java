package com.sia.myridehub.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.sia.myridehub.exception.ErrorDetails;
import com.sia.myridehub.model.ContactMessage;
import com.sia.myridehub.model.dto.ContactRequestDto;
import com.sia.myridehub.service.ContactService;
import com.sia.myridehub.service.EmailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // For development; restrict origins in production
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    private final ContactService contactService;
    private final EmailService emailService;

    @Autowired
    public ContactController(ContactService contactService, EmailService emailService) {
        this.contactService = contactService;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<?> submitContactForm(
            @Valid @RequestBody ContactRequestDto contactRequest,
            WebRequest request) {
        try {
            // Save contact message to database
            ContactMessage savedMessage = contactService.saveContactMessage(contactRequest);

            // Send email notification (optional: make it async in the future)
            try {
                emailService.sendContactNotification(savedMessage);
            } catch (Exception e) {
                // Log email sending failure but don't fail the contact submission
                logger.error("Failed to send email notification", e);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("timestamp", new Date());
            response.put("message", "Your message has been sent successfully!");
            response.put("success", true);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            ErrorDetails errorDetails = new ErrorDetails(
                    new Date(),
                    "Failed to process your message: " + e.getMessage(),
                    request.getDescription(false)
            );
            return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorDetails errorDetails = new ErrorDetails(
                new Date(),
                "Validation failed",
                request.getDescription(false)
        );

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", errorDetails.getTimestamp());
        response.put("message", errorDetails.getMessage());
        response.put("details", errorDetails.getDetails());
        response.put("errors", errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}