package com.sia.myridehub.controller;

import com.sia.myridehub.model.Motorcycle;
import com.sia.myridehub.service.MotorcycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motorcycles")
public class MotorcycleController {

    @Autowired
    private MotorcycleService motorcycleService;

    @GetMapping
    public ResponseEntity<List<Motorcycle>> getAllMotorcycles() {
        return ResponseEntity.ok(motorcycleService.getAllMotorcycles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Motorcycle> getMotorcycleById(@PathVariable Long id) {
        return motorcycleService.getMotorcycleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Motorcycle> createMotorcycle(@RequestBody Motorcycle motorcycle) {
        return new ResponseEntity<>(motorcycleService.saveMotorcycle(motorcycle), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Motorcycle> updateMotorcycle(@PathVariable Long id, @RequestBody Motorcycle motorcycle) {
        return motorcycleService.getMotorcycleById(id)
                .map(existingMotorcycle -> {
                    motorcycle.setId(id);
                    return ResponseEntity.ok(motorcycleService.saveMotorcycle(motorcycle));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMotorcycle(@PathVariable Long id) {
        return motorcycleService.getMotorcycleById(id)
                .map(motorcycle -> {
                    motorcycleService.deleteMotorcycle(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
