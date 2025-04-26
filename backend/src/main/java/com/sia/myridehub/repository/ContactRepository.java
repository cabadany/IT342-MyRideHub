package com.sia.myridehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.ContactMessage;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
    // Custom query methods can be added here if needed
}