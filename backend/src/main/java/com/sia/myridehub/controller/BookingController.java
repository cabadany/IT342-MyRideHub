package com.sia.myridehub.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sia.myridehub.model.Booking;
import com.sia.myridehub.model.Driver;
import com.sia.myridehub.service.BookingService;
import com.sia.myridehub.service.DriverService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final DriverService driverService;

    public BookingController(BookingService bookingService, DriverService driverService) {
        this.bookingService = bookingService;
        this.driverService = driverService;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
public ResponseEntity<List<Booking>> getBookingsByCustomerId(@PathVariable String customerId) {
    try {
        List<Booking> bookings = bookingService.getBookingsByCustomerId(customerId);
        return ResponseEntity.ok(bookings);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(null);
    }
}

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            if (!"Car".equalsIgnoreCase(booking.getVehicleType()) &&
                !"Motorcycle".equalsIgnoreCase(booking.getVehicleType())) {
                return ResponseEntity.badRequest().body("Invalid vehicle type. Must be 'Car' or 'Motorcycle'.");
            }

            if (booking.getDriverId() != null) {
                Driver driver = driverService.getDriverById(booking.getDriverId());
                booking.setDriver(driver);
            }

            return ResponseEntity.ok(bookingService.createBooking(booking));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating booking: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        String status = statusMap.getOrDefault("status", "").trim();
        if (status.isEmpty()) {
            return ResponseEntity.badRequest().body("Status cannot be empty");
        }

        return bookingService.getBookingById(id)
                .map(existing -> ResponseEntity.ok(bookingService.updateBookingStatus(id, status)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingService.getBookingById(id)
                .map(existing -> ResponseEntity.ok(bookingService.updateBooking(id, updatedBooking)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}