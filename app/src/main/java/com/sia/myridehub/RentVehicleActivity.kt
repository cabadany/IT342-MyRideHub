package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class RentVehicleActivity : AppCompatActivity() {

    private lateinit var menuButton: ImageButton
    private lateinit var fourWheelsToggle: TextView
    private lateinit var twoWheelsToggle: TextView
    private lateinit var bookRideButton: Button
    private lateinit var rentVehicleButton: Button
    private lateinit var rentNowButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rent_vehicle)

        // Initialize views
        menuButton = findViewById(R.id.menuButton)
        fourWheelsToggle = findViewById(R.id.fourWheelsToggle)
        twoWheelsToggle = findViewById(R.id.twoWheelsToggle)
        bookRideButton = findViewById(R.id.bookRideButton)
        rentVehicleButton = findViewById(R.id.rentVehicleButton)
        rentNowButton = findViewById(R.id.rentNowButton)

        // Set up click listeners
        menuButton.setOnClickListener {
            // Open navigation drawer or menu
            Toast.makeText(this, "Menu clicked", Toast.LENGTH_SHORT).show()
        }

        fourWheelsToggle.setOnClickListener {
            setToggleState(true, false)
            // Load 4-wheel vehicles
            Toast.makeText(this, "4 Wheels selected", Toast.LENGTH_SHORT).show()
        }

        twoWheelsToggle.setOnClickListener {
            setToggleState(false, true)
            // Load 2-wheel vehicles
            Toast.makeText(this, "2 Wheels selected", Toast.LENGTH_SHORT).show()
        }

        bookRideButton.setOnClickListener {
            // Navigate to Book a Ride screen
            Toast.makeText(this, "Book a Ride clicked", Toast.LENGTH_SHORT).show()
        }

        rentVehicleButton.setOnClickListener {
            // Already on Rent a Vehicle screen
            Toast.makeText(this, "Already on Rent a Vehicle", Toast.LENGTH_SHORT).show()
        }

        rentNowButton.setOnClickListener {
            // Process rental
            Toast.makeText(this, "Renting Yamaha NMAX", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setToggleState(fourWheelsSelected: Boolean, twoWheelsSelected: Boolean) {
        if (fourWheelsSelected) {
            fourWheelsToggle.setBackgroundResource(R.drawable.toggle_selected)
            fourWheelsToggle.setTextColor(resources.getColor(R.color.black, theme))
            twoWheelsToggle.background = null
            twoWheelsToggle.setTextColor(resources.getColor(R.color.white, theme))
        } else {
            twoWheelsToggle.setBackgroundResource(R.drawable.toggle_selected)
            twoWheelsToggle.setTextColor(resources.getColor(R.color.black, theme))
            fourWheelsToggle.background = null
            fourWheelsToggle.setTextColor(resources.getColor(R.color.white, theme))
        }
    }
}