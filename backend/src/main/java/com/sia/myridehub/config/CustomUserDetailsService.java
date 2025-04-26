package com.sia.myridehub.config;

import com.sia.myridehub.model.Driver;
import com.sia.myridehub.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private DriverRepository driverRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Driver driver = driverRepository.findByMobileNumber(username)
                .orElseThrow(() -> new UsernameNotFoundException("Driver not found with mobile number: " + username));
        
        return new User(driver.getMobileNumber(), driver.getPassword(), new ArrayList<>());
    }
}