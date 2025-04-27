package com.sia.myridehub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sia.myridehub.model.RentHistory;
import com.sia.myridehub.repository.RentHistoryRepository;

@Service
public class RentHistoryService {

    private final RentHistoryRepository rentHistoryRepository;

    public RentHistoryService(RentHistoryRepository rentHistoryRepository) {
        this.rentHistoryRepository = rentHistoryRepository;
    }

    public List<RentHistory> getAllRentHistories() {
        return rentHistoryRepository.findAll();
    }

    public Optional<RentHistory> getRentHistoryById(Long id) {
        return rentHistoryRepository.findById(id);
    }

    public List<RentHistory> getRentHistoriesByVehicleId(Long vehicleId) {
        return rentHistoryRepository.findByVehicleId(vehicleId);
    }

    public RentHistory saveRentHistory(RentHistory rentHistory) {
        return rentHistoryRepository.save(rentHistory);
    }

    public void deleteRentHistory(Long id) {
        rentHistoryRepository.deleteById(id);
    }
}
