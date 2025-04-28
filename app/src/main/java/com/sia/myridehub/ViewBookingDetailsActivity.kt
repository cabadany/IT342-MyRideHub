package com.sia.myridehub

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ViewBookingDetailsActivity : AppCompatActivity() {

    private lateinit var bookingDetailsText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_view_booking_details)

        bookingDetailsText = findViewById(R.id.bookingDetailsText)

        val pickupDate = intent.getStringExtra("pickupDate") ?: ""
        val returnDate = intent.getStringExtra("returnDate") ?: ""
        val pickupTime = intent.getStringExtra("pickupTime") ?: ""
        val dropoffTime = intent.getStringExtra("dropoffTime") ?: ""
        val withDriver = intent.getBooleanExtra("withDriver", false)
        val totalDays = intent.getIntExtra("totalDays", 1)
        val totalPrice = intent.getIntExtra("totalPrice", 0)

        val summary = """
            🛻 Booking Full Details:

            Pick-up Date: $pickupDate
            Return Date: $returnDate
            Pick-up Time: $pickupTime
            Drop-off Time: $dropoffTime
            Driver Option: ${if (withDriver) "With Driver" else "Self Drive"}
            Total Days: $totalDays
            Total Price: ₱$totalPrice
        """.trimIndent()

        bookingDetailsText.text = summary
    }
}