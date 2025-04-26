package com.sia.myridehub.service;

import com.sia.myridehub.model.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void sendContactNotification(ContactMessage contactMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("admin@myridehub.com");
        message.setSubject("New Contact Form Submission");
        message.setText(
            "New message from: " + contactMessage.getFullName() + "\n" +
            "Email: " + contactMessage.getEmail() + "\n" +
            "Message: " + contactMessage.getMessage()
        );
        
        mailSender.send(message);
    }
}