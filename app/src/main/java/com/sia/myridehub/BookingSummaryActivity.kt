package com.sia.myridehub

import android.content.Intent
import android.location.Geocoder
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.maps.model.LatLng
import com.google.firebase.database.FirebaseDatabase
import com.sia.myridehub.model.Booking
import java.util.*
import kotlin.math.*

class BookingSummaryActivity : AppCompatActivity() {

    private lateinit var pickupTextView: TextView
    private lateinit var dropoffTextView: TextView
    private lateinit var vehicleTypeTextView: TextView
    private lateinit var distanceTextView: TextView
    private lateinit var fareTextView: TextView
    private lateinit var confirmBookingButton: Button

    private var pickupLat = 0.0
    private var pickupLng = 0.0
    private var dropoffLat = 0.0
    private var dropoffLng = 0.0
    private var vehicleType = ""

    private var pickupAddress: String = ""
    private var dropoffAddress: String = ""
    private var rideFare: Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_booking_summary)

        pickupTextView = findViewById(R.id.pickupLocation)
        dropoffTextView = findViewById(R.id.dropoffLocation)
        vehicleTypeTextView = findViewById(R.id.vehicleType)
        distanceTextView = findViewById(R.id.distance)
        fareTextView = findViewById(R.id.fare)
        confirmBookingButton = findViewById(R.id.confirmBookingButton)

        pickupLat = intent.getDoubleExtra("pickupLat", 0.0)
        pickupLng = intent.getDoubleExtra("pickupLng", 0.0)
        dropoffLat = intent.getDoubleExtra("dropoffLat", 0.0)
        dropoffLng = intent.getDoubleExtra("dropoffLng", 0.0)
        vehicleType = intent.getStringExtra("vehicleType") ?: ""

        displayBookingDetails()

        confirmBookingButton.setOnClickListener {
            saveBookingToFirebase()
        }
    }

    private fun displayBookingDetails() {
        val pickup = LatLng(pickupLat, pickupLng)
        val dropoff = LatLng(dropoffLat, dropoffLng)

        pickupAddress = getAddressFromLatLng(pickup.latitude, pickup.longitude)
        dropoffAddress = getAddressFromLatLng(dropoff.latitude, dropoff.longitude)

        pickupTextView.text = "Pickup: $pickupAddress"
        dropoffTextView.text = "Drop-off: $dropoffAddress"
        vehicleTypeTextView.text = "Vehicle: $vehicleType"

        val distanceInKm = calculateDistanceInKm(pickup, dropoff)
        distanceTextView.text = "Distance: %.2f km".format(distanceInKm)

        rideFare = calculateFare(distanceInKm, vehicleType)
        fareTextView.text = "Fare: ₱%.2f".format(rideFare)
    }

    private fun calculateDistanceInKm(pickup: LatLng, dropoff: LatLng): Double {
        val earthRadius = 6371 // Radius of the earth in km
        val dLat = Math.toRadians(dropoff.latitude - pickup.latitude)
        val dLng = Math.toRadians(dropoff.longitude - pickup.longitude)
        val a = sin(dLat / 2).pow(2.0) + cos(Math.toRadians(pickup.latitude)) *
                cos(Math.toRadians(dropoff.latitude)) *
                sin(dLng / 2).pow(2.0)
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return earthRadius * c
    }

    private fun calculateFare(distanceInKm: Double, vehicleType: String): Double {
        val baseFare = when (vehicleType) {
            "Motorcycle" -> 50.0
            "Car" -> 80.0
            else -> 60.0
        }
        val perKmRate = when (vehicleType) {
            "Motorcycle" -> 8.0
            "Car" -> 12.0
            else -> 10.0
        }
        return baseFare + (distanceInKm * perKmRate)
    }

    private fun getAddressFromLatLng(lat: Double, lng: Double): String {
        val geocoder = Geocoder(this, Locale.getDefault())
        return try {
            val addresses = geocoder.getFromLocation(lat, lng, 1)
            if (!addresses.isNullOrEmpty()) {
                addresses[0].getAddressLine(0)
            } else {
                "Unknown Address"
            }
        } catch (e: Exception) {
            "Unknown Address"
        }
    }

    private fun saveBookingToFirebase() {
        val database = FirebaseDatabase.getInstance()
        val bookingsRef = database.getReference("bookings")

        val bookingId = bookingsRef.push().key ?: return

        val booking = Booking(
            bookingId = bookingId,
            pickupDate = pickupAddress, // 🔥 Now saving the real address
            returnDate = dropoffAddress, // 🔥 Now saving the real address
            pickupTime = "ASAP",
            dropoffTime = "ETA 20min",
            withDriver = true,
            totalDays = 1,
            totalPrice = rideFare.toInt(), // 🔥 Save fare as Int
            timestamp = System.currentTimeMillis(),
            type = "booking"
        )

        bookingsRef.child(bookingId).setValue(booking).addOnCompleteListener { task ->
            if (task.isSuccessful) {
                Toast.makeText(this, "Booking Confirmed! 🚀", Toast.LENGTH_SHORT).show()
                val intent = Intent(this, BookingSuccessActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "Failed to save booking. Please try again.", Toast.LENGTH_SHORT).show()
            }
        }
    }
}