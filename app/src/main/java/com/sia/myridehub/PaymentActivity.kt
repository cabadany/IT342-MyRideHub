package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class PaymentActivity : AppCompatActivity() {

    private lateinit var totalPriceText: TextView
    private lateinit var payNowButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)

        totalPriceText = findViewById(R.id.totalPriceText)
        payNowButton = findViewById(R.id.payNowButton)

        val totalPrice = intent.getIntExtra("totalPrice", 0)

        totalPriceText.text = "Total Amount: ₱$totalPrice"

        payNowButton.setOnClickListener {
            Toast.makeText(this, "Payment Successful! 🎉", Toast.LENGTH_LONG).show()

            // After payment success, you can go back to MainActivity or show a success page
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}