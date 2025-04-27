package com.sia.myridehub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionId;
    private String amountPaid;
    private String model;
    private String rentalPeriod;
    private String pickupLocation;
    private String paymentMethod;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getAmountPaid() { return amountPaid; }
    public void setAmountPaid(String amountPaid) { this.amountPaid = amountPaid; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getRentalPeriod() { return rentalPeriod; }
    public void setRentalPeriod(String rentalPeriod) { this.rentalPeriod = rentalPeriod; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
