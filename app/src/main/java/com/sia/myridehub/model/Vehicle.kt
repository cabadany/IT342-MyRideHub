package com.sia.myridehub.model

data class Vehicle(
    var model: String? = null,
    var year: Int? = null,
    var pricePerDay: Int? = null,
    var type: String? = null,
    var seats: String? = null,
    var engine: String? = null,
    var imageUrl: String? = null,
    var available: Boolean? = null,
    var category: String? = null,
    var color: String? = null,
    var transmission: String? = null,
    var fuelType: String? = null,
    var vin: String? = null,
    var registration: String? = null,
    var regExpiry: String? = null,
    var features: String? = null
)