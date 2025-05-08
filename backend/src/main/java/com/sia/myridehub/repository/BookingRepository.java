package com.sia.myridehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerNameContainingIgnoreCase(String customerName);
    List<Booking> findByStatus(String status);
    List<Booking> findByCustomerId(String customerId);
}