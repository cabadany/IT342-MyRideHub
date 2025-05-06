package com.sia.myridehub.controller;

import java.util.List;
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

import com.sia.myridehub.model.RentHistory;
import com.sia.myridehub.service.RentHistoryService;

@RestController
@RequestMapping("/api/rent-history")
public class RentHistoryController {

    private final RentHistoryService rentHistoryService;

    public RentHistoryController(RentHistoryService rentHistoryService) {
        this.rentHistoryService = rentHistoryService;
    }

    @GetMapping
    public ResponseEntity<List<RentHistory>> getAllRentHistories() {
        return ResponseEntity.ok(rentHistoryService.getAllRentHistories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentHistory> getRentHistoryById(@PathVariable Long id) {
        Optional<RentHistory> rentHistory = rentHistoryService.getRentHistoryById(id);
        return rentHistory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<RentHistory>> getRentHistoriesByVehicleId(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(rentHistoryService.getRentHistoriesByVehicleId(vehicleId));
    }

    @PostMapping
    public ResponseEntity<RentHistory> createRentHistory(@RequestBody RentHistory rentHistory) {
        return ResponseEntity.ok(rentHistoryService.saveRentHistory(rentHistory));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RentHistory> updateRentHistory(@PathVariable Long id, @RequestBody RentHistory rentHistory) {
        return rentHistoryService.getRentHistoryById(id)
                .map(existing -> {
                    rentHistory.setId(id);
                    return ResponseEntity.ok(rentHistoryService.saveRentHistory(rentHistory));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRentHistory(@PathVariable Long id) {
        if (rentHistoryService.getRentHistoryById(id).isPresent()) {
            rentHistoryService.deleteRentHistory(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}