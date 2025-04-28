package com.sia.myridehub.model

data class Vehicle(
    val model: String = "",
    val year: Int = 0,
    val pricePerDay: Int = 0,
    val type: String = "",
    val seats: String = "",
    val engine: String = "",
    val imageUrl: String = "",
    val available: Boolean = true,
    val category: String = "",
    val color: String = "",
    val transmission: String = "",
    val fuelType: String = "",
    val vin: String = "",
    val registration: String = "",
    val regExpiry: String = "",
    val features: String = ""
)