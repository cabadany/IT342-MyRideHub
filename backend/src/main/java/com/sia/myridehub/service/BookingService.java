package com.sia.myridehub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sia.myridehub.model.Booking;
import com.sia.myridehub.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByCustomerName(String name) {
        return bookingRepository.findByCustomerNameContainingIgnoreCase(name);
    }

    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        Booking booking = bookingRepository.findById(id).orElseThrow();

        booking.setCustomerName(updatedBooking.getCustomerName());
        booking.setContactNumber(updatedBooking.getContactNumber());
        booking.setPickupDate(updatedBooking.getPickupDate());
        booking.setReturnDate(updatedBooking.getReturnDate());
        booking.setStatus(updatedBooking.getStatus());
        booking.setVehicleType(updatedBooking.getVehicleType());

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}