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
import com.sia.myridehub.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // GET /api/bookings - List all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // GET /api/bookings/{id} - Get a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/bookings - Create a booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            // Only save if vehicleType is valid
            if (!"Car".equalsIgnoreCase(booking.getVehicleType()) &&
                !"Motorcycle".equalsIgnoreCase(booking.getVehicleType())) {
                return ResponseEntity.badRequest().body("Invalid vehicle type. Must be 'Car' or 'Motorcycle'.");
            }

            Booking saved = bookingService.createBooking(booking);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating booking: " + e.getMessage());
        }
    }

    // PUT /api/bookings/{id}/status - Update booking status
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

    // PUT /api/bookings/{id} - Update full booking
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingService.getBookingById(id)
                .map(existing -> ResponseEntity.ok(bookingService.updateBooking(id, updatedBooking)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/bookings/{id} - Delete booking
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