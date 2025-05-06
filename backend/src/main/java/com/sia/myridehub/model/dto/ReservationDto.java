package com.sia.myridehub.model.dto;

public class ReservationDto {
    private Long id;
    private Long vehicleId;
    private String pickUpDate;
    private String pickUpTime;
    private String returnDate;
    private String returnTime;
    private double totalAmount;
    private boolean withDriver;
    private CustomerInfo customer;

    public static class CustomerInfo {
        private String firstName;
        private String lastName;
        private String phone;
        private String email;

        // Getters and Setters
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }

        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getPickUpDate() { return pickUpDate; }
    public void setPickUpDate(String pickUpDate) { this.pickUpDate = pickUpDate; }

    public String getPickUpTime() { return pickUpTime; }
    public void setPickUpTime(String pickUpTime) { this.pickUpTime = pickUpTime; }

    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }

    public String getReturnTime() { return returnTime; }
    public void setReturnTime(String returnTime) { this.returnTime = returnTime; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public boolean isWithDriver() { return withDriver; }
    public void setWithDriver(boolean withDriver) { this.withDriver = withDriver; }

    public CustomerInfo getCustomer() { return customer; }
    public void setCustomer(CustomerInfo customer) { this.customer = customer; }
}