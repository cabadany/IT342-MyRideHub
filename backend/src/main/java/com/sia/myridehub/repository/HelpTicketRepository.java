package com.sia.myridehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.Driver;
import com.sia.myridehub.model.HelpTicket;

@Repository
public interface HelpTicketRepository extends JpaRepository<HelpTicket, Long> {
    
    List<HelpTicket> findByDriverOrderByCreatedAtDesc(Driver driver);
}