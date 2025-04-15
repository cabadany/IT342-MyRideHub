package com.sia.myridehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Custom query to search by customer name (case-insensitive)
    @Query("SELECT b FROM Booking b WHERE LOWER(b.customerName) LIKE LOWER(CONCAT('%', :customerName, '%'))")
    List<Booking> findByCustomerName(@Param("customerName") String customerName);

    // Custom query to fetch bookings by vehicle ID and join with Vehicle to ensure all fields are populated
    @Query("SELECT b FROM Booking b JOIN FETCH b.vehicle WHERE b.vehicle.id = :vehicleId")
    List<Booking> findByVehicleId(@Param("vehicleId") Long vehicleId);

    // Query to fetch bookings by status
    List<Booking> findByStatus(String status);
}