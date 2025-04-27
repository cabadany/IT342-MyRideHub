package com.sia.myridehub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sia.myridehub.model.BookingHistory;
import com.sia.myridehub.repository.BookingHistoryRepository;

@Service
public class BookingHistoryService {

    private final BookingHistoryRepository bookingHistoryRepository;

    public BookingHistoryService(BookingHistoryRepository bookingHistoryRepository) {
        this.bookingHistoryRepository = bookingHistoryRepository;
    }

    public List<BookingHistory> getAllBookingHistories() {
        return bookingHistoryRepository.findAll();
    }

    public List<BookingHistory> getBookingHistoriesByCustomerName(String customerName) {
        return bookingHistoryRepository.findByCustomerNameContainingIgnoreCase(customerName);
    }

    public List<BookingHistory> getBookingHistoriesByStatus(String status) {
        return bookingHistoryRepository.findByStatus(status);
    }

    public BookingHistory saveBookingHistory(BookingHistory bookingHistory) {
        return bookingHistoryRepository.save(bookingHistory);
    }

    public void deleteBookingHistory(Long id) {
        bookingHistoryRepository.deleteById(id);
    }
}
