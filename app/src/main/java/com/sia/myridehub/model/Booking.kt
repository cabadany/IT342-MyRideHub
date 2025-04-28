package com.sia.myridehub.model

data class Booking(
    var bookingId: String? = null,
    var pickupDate: String? = null,
    var returnDate: String? = null,
    var pickupTime: String? = null,
    var dropoffTime: String? = null,
    var withDriver: Boolean? = null,
    var totalDays: Int? = null,
    var totalPrice: Int? = null,
    var timestamp: Long? = null,
    var type: String? = null
)