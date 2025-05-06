package com.sia.myridehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sia.myridehub.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}