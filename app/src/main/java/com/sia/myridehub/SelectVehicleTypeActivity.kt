package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class SelectVehicleTypeActivity : AppCompatActivity() {

    private lateinit var motorcycleButton: Button
    private lateinit var carButton: Button

    private var pickupLat: Double = 0.0
    private var pickupLng: Double = 0.0
    private var dropoffLat: Double = 0.0
    private var dropoffLng: Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_select_vehicle_type)

        pickupLat = intent.getDoubleExtra("pickupLat", 0.0)
        pickupLng = intent.getDoubleExtra("pickupLng", 0.0)
        dropoffLat = intent.getDoubleExtra("dropoffLat", 0.0)
        dropoffLng = intent.getDoubleExtra("dropoffLng", 0.0)

        motorcycleButton = findViewById(R.id.motorcycleButton)
        carButton = findViewById(R.id.carButton)

        motorcycleButton.setOnClickListener {
            goToBookingSummary("Motorcycle")
        }

        carButton.setOnClickListener {
            goToBookingSummary("Car")
        }
    }

    private fun goToBookingSummary(vehicleType: String) {
        val intent = Intent(this, BookingSummaryActivity::class.java)
        intent.putExtra("pickupLat", pickupLat)
        intent.putExtra("pickupLng", pickupLng)
        intent.putExtra("dropoffLat", dropoffLat)
        intent.putExtra("dropoffLng", dropoffLng)
        intent.putExtra("vehicleType", vehicleType)
        startActivity(intent)
        finish()
    }
}