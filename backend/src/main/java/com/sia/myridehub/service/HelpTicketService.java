package com.sia.myridehub.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sia.myridehub.exception.ResourceNotFoundException;
import com.sia.myridehub.model.Driver;
import com.sia.myridehub.model.HelpTicket;
import com.sia.myridehub.model.dto.HelpTicketDto;
import com.sia.myridehub.repository.HelpTicketRepository;

@Service
public class HelpTicketService {
    
    private final HelpTicketRepository helpTicketRepository;
    private final DriverService driverService;
    
    @Autowired
    public HelpTicketService(HelpTicketRepository helpTicketRepository, DriverService driverService) {
        this.helpTicketRepository = helpTicketRepository;
        this.driverService = driverService;
    }
    
    public HelpTicket createHelpTicket(Long driverId, HelpTicketDto helpTicketDto) {
        // Fetch the driver by ID
        Driver driver = driverService.getDriverById(driverId);
        
        HelpTicket helpTicket = new HelpTicket();
        helpTicket.setDriver(driver);
        helpTicket.setSubject(helpTicketDto.getSubject());
        helpTicket.setMessage(helpTicketDto.getMessage());
        
        return helpTicketRepository.save(helpTicket);
    }
    
    public List<HelpTicket> getDriverHelpTickets(Long driverId) {
        // Fetch the driver by ID
        Driver driver = driverService.getDriverById(driverId);
        return helpTicketRepository.findByDriverOrderByCreatedAtDesc(driver);
    }
    
    public HelpTicket getHelpTicketById(Long id) {
        return helpTicketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help ticket not found with id: " + id));
    }
    
    public HelpTicket updateHelpTicketStatus(Long id, String status) {
        HelpTicket helpTicket = getHelpTicketById(id);
        helpTicket.setStatus(status);
        helpTicket.setUpdatedAt(LocalDateTime.now());
        return helpTicketRepository.save(helpTicket);
    }
}