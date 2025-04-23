package com.sia.myridehub.service;

import com.sia.myridehub.model.Motorcycle;
import com.sia.myridehub.repository.MotorcycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotorcycleService {

    @Autowired
    private MotorcycleRepository motorcycleRepository;

    public List<Motorcycle> getAllMotorcycles() {
        return motorcycleRepository.findAll();
    }

    public Optional<Motorcycle> getMotorcycleById(Long id) {
        return motorcycleRepository.findById(id);
    }

    public Motorcycle saveMotorcycle(Motorcycle motorcycle) {
        return motorcycleRepository.save(motorcycle);
    }

    public void deleteMotorcycle(Long id) {
        motorcycleRepository.deleteById(id);
    }
}
