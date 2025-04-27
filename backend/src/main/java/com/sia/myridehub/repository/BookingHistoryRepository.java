package com.sia.myridehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.BookingHistory;

@Repository
public interface BookingHistoryRepository extends JpaRepository<BookingHistory, Long> {

    List<BookingHistory> findByCustomerNameContainingIgnoreCase(String customerName);

    List<BookingHistory> findByStatus(String status);
}
