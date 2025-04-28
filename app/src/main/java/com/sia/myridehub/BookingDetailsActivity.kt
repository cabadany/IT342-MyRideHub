package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.database.FirebaseDatabase
import com.sia.myridehub.model.Booking

class BookingDetailsActivity : AppCompatActivity() {

    private lateinit var bookingSummaryText: TextView
    private lateinit var proceedToPaymentButton: Button

    private var pickupDate: String = ""
    private var returnDate: String = ""
    private var pickupTime: String = ""
    private var dropoffTime: String = ""
    private var withDriver: Boolean = false
    private var totalDays: Int = 1
    private var totalPrice: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_booking_details)

        bookingSummaryText = findViewById(R.id.bookingSummaryText)
        proceedToPaymentButton = findViewById(R.id.proceedToPaymentButton)

        // Receive booking details from RentFormActivity
        pickupDate = intent.getStringExtra("pickupDate") ?: ""
        returnDate = intent.getStringExtra("returnDate") ?: ""
        pickupTime = intent.getStringExtra("pickupTime") ?: ""
        dropoffTime = intent.getStringExtra("dropoffTime") ?: ""
        withDriver = intent.getBooleanExtra("withDriver", false)
        totalDays = intent.getIntExtra("totalDays", 1)
        totalPrice = intent.getIntExtra("totalPrice", 0)

        val summary = """
            🛻 Booking Details:

            Pick-up Date: $pickupDate
            Return Date: $returnDate
            Pick-up Time: $pickupTime
            Drop-off Time: $dropoffTime
            Driver Option: ${if (withDriver) "With Driver" else "Self Drive"}

            Total Days: $totalDays
            Total Price: ₱$totalPrice
        """.trimIndent()

        bookingSummaryText.text = summary

        proceedToPaymentButton.setOnClickListener {
            saveBookingToFirebase()
        }
    }

    private fun saveBookingToFirebase() {
        val database = FirebaseDatabase.getInstance()
        val bookingsRef = database.getReference("bookings")

        val bookingId = bookingsRef.push().key ?: return

        val booking = Booking(
            bookingId = bookingId,
            pickupDate = pickupDate,
            returnDate = returnDate,
            pickupTime = pickupTime,
            dropoffTime = dropoffTime,
            withDriver = withDriver,
            totalDays = totalDays,
            totalPrice = totalPrice,
            timestamp = System.currentTimeMillis(),
            type = "renting" // 🔥 Mark this order as "renting"
        )

        bookingsRef.child(bookingId).setValue(booking).addOnCompleteListener { task ->
            if (task.isSuccessful) {
                // Booking saved successfully 🎉
                val intent = Intent(this, PaymentActivity::class.java)
                intent.putExtra("totalPrice", booking.totalPrice ?: 0)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "Failed to save booking. Please try again.", Toast.LENGTH_SHORT).show()
            }
        }
    }
}