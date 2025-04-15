package com.sia.myridehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByCategory(String category);
    
    @Query("SELECT v FROM Vehicle v WHERE v.available = true")
    List<Vehicle> findByAvailable(boolean available);  
    
    @Query("SELECT v FROM Vehicle v WHERE v.category = :category AND v.available = true")
    List<Vehicle> findByAvailableAndCategory(boolean available, @Param("category") String category); 
}