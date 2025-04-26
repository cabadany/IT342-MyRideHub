package com.sia.myridehub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sia.myridehub.model.BookingHistory;
import com.sia.myridehub.service.BookingHistoryService;

@RestController
@RequestMapping("/api/booking-history")
public class BookingHistoryController {

    private final BookingHistoryService bookingHistoryService;

    public BookingHistoryController(BookingHistoryService bookingHistoryService) {
        this.bookingHistoryService = bookingHistoryService;
    }

    @GetMapping
    public ResponseEntity<List<BookingHistory>> getAllBookingHistories() {
        return ResponseEntity.ok(bookingHistoryService.getAllBookingHistories());
    }

    @GetMapping("/customer/{customerName}")
    public ResponseEntity<List<BookingHistory>> getBookingHistoriesByCustomerName(@PathVariable String customerName) {
        return ResponseEntity.ok(bookingHistoryService.getBookingHistoriesByCustomerName(customerName));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BookingHistory>> getBookingHistoriesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(bookingHistoryService.getBookingHistoriesByStatus(status));
    }

    @PostMapping
    public ResponseEntity<BookingHistory> saveBookingHistory(@RequestBody BookingHistory bookingHistory) {
        return ResponseEntity.ok(bookingHistoryService.saveBookingHistory(bookingHistory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookingHistory(@PathVariable Long id) {
        bookingHistoryService.deleteBookingHistory(id);
        return ResponseEntity.ok().build();
    }
}
