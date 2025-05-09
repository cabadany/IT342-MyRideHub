package com.sia.myridehub

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.sia.myridehub.R

class FareCalculatorActivity : AppCompatActivity() {

    private lateinit var distanceInput: EditText
    private lateinit var durationInput: EditText
    private lateinit var calculateButton: Button
    private lateinit var resultText: TextView

    private val BASE_FARE = 40
    private val PER_KM_RATE = 8
    private val PER_MIN_RATE = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_fare_calculator)

        distanceInput = findViewById(R.id.distanceInput)
        durationInput = findViewById(R.id.durationInput)
        calculateButton = findViewById(R.id.calculateFareButton)
        resultText = findViewById(R.id.resultText)

        calculateButton.setOnClickListener {
            val distance = distanceInput.text.toString().toDoubleOrNull() ?: 0.0
            val duration = durationInput.text.toString().toDoubleOrNull() ?: 0.0
            val fare = BASE_FARE + (distance * PER_KM_RATE) + (duration * PER_MIN_RATE)
            resultText.text = "Estimated Fare: ₱${fare.toInt()}"
        }
    }
}