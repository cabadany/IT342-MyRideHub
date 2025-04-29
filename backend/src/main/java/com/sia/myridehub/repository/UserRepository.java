package com.sia.myridehub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sia.myridehub.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}