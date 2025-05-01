package com.sia.myridehub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByMobileNumber(String mobileNumber);
    Optional<Driver> findByEmail(String email);
    boolean existsByMobileNumber(String mobileNumber);

    Optional<Driver> findFirstByAvailableTrue();
}