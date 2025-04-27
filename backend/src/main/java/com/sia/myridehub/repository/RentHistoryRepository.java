package com.sia.myridehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sia.myridehub.model.RentHistory;

@Repository
public interface RentHistoryRepository extends JpaRepository<RentHistory, Long> {

    List<RentHistory> findByVehicleId(Long vehicleId);
}
