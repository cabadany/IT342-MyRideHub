package com.sia.myridehub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sia.myridehub.model.ContactMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${myridehub.admin.email}")
    private String adminEmail;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactNotification(ContactMessage contactMessage) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(adminEmail); // Set the FROM address
            message.setTo(adminEmail);   // Set the TO address (admin email)
            message.setSubject("New Contact Form Submission");
            message.setText(
                "You have received a new contact message.\n\n" +
                "Name: " + contactMessage.getFullName() + "\n" +
                "Email: " + contactMessage.getEmail() + "\n" +
                "Message: \n" + contactMessage.getMessage() + "\n\n" +
                "- MyRideHub Team"
            );

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send contact notification email: " + e.getMessage());
        }
    }
}