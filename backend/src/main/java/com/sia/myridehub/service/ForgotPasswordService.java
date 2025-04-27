package com.sia.myridehub.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sia.myridehub.model.User;
import com.sia.myridehub.repository.UserRepository;

@Service
public class ForgotPasswordService {

    @Autowired
    private UserRepository userRepository;

    public boolean resetPassword(String email, String newPassword) {
        Optional<User> optionalUser = userRepository.findAll()
            .stream()
            .filter(user -> user.getEmail().equalsIgnoreCase(email))
            .findFirst();
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }
}
