package com.sia.myridehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.UserProfile;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
