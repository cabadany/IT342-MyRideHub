package com.sia.myridehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sia.myridehub.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
