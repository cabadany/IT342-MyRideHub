package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class BookingDetailsActivity : AppCompatActivity() {

    private lateinit var bookingSummaryText: TextView
    private lateinit var proceedToPaymentButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_booking_details)

        bookingSummaryText = findViewById(R.id.bookingSummaryText)
        proceedToPaymentButton = findViewById(R.id.proceedToPaymentButton)

        val pickupDate = intent.getStringExtra("pickupDate") ?: ""
        val returnDate = intent.getStringExtra("returnDate") ?: ""
        val pickupTime = intent.getStringExtra("pickupTime") ?: ""
        val dropoffTime = intent.getStringExtra("dropoffTime") ?: ""
        val withDriver = intent.getBooleanExtra("withDriver", false)
        val totalDays = intent.getIntExtra("totalDays", 1)
        val totalPrice = intent.getIntExtra("totalPrice", 0)

        val summary = """
            🛻 Booking Details:

            Pick-up Date: $pickupDate
            Return Date: $returnDate
            Pick-up Time: $pickupTime
            Drop-off Time: $dropoffTime
            Driver: ${if (withDriver) "With Driver" else "Self Drive"}

            Total Days: $totalDays
            Total Price: ₱$totalPrice
        """.trimIndent()

        bookingSummaryText.text = summary

        proceedToPaymentButton.setOnClickListener {
            val intent = Intent(this, PaymentActivity::class.java)
            intent.putExtra("totalPrice", totalPrice) // 🔥 pass the price
            startActivity(intent)
        }
    }
}