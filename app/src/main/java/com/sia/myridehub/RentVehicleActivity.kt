package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.bumptech.glide.Glide
import com.google.android.material.navigation.NavigationView
import com.google.firebase.database.*
import com.sia.myridehub.model.Vehicle

class RentVehicleActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView
    private lateinit var menuButton: ImageButton

    private lateinit var fourWheelsToggle: TextView
    private lateinit var twoWheelsToggle: TextView
    private lateinit var bookRideButton: Button
    private lateinit var rentVehicleButton: Button
    private lateinit var rentNowButton: Button
    private lateinit var nextVehicleButton: Button
    private lateinit var progressBar: ProgressBar

    private lateinit var vehicleName: TextView
    private lateinit var rentPrice: TextView
    private lateinit var vehicleImage: ImageView
    private lateinit var seats: TextView
    private lateinit var engine: TextView
    private lateinit var color: TextView
    private lateinit var transmission: TextView
    private lateinit var fuelType: TextView

    private lateinit var database: DatabaseReference
    private var vehicleList = mutableListOf<Vehicle>()
    private var filteredList = mutableListOf<Vehicle>()
    private var currentVehicleIndex = 0
    private var currentCategory = "2 Wheels"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rent_vehicle)

        initViews()
        initFirebase()
        loadVehicles()
    }

    private fun initViews() {
        drawerLayout = findViewById(R.id.drawerLayout)
        navigationView = findViewById(R.id.navigationView)
        menuButton = findViewById(R.id.menuButton)

        fourWheelsToggle = findViewById(R.id.fourWheelsToggle)
        twoWheelsToggle = findViewById(R.id.twoWheelsToggle)
        bookRideButton = findViewById(R.id.bookRideButton)
        rentVehicleButton = findViewById(R.id.rentVehicleButton)
        rentNowButton = findViewById(R.id.rentNowButton)
        nextVehicleButton = findViewById(R.id.nextVehicleButton)
        progressBar = findViewById(R.id.progressBar)

        vehicleName = findViewById(R.id.vehicleName)
        rentPrice = findViewById(R.id.rentPrice)
        vehicleImage = findViewById(R.id.vehicleImage)
        seats = findViewById(R.id.seats)
        engine = findViewById(R.id.engine)
        color = findViewById(R.id.color)
        transmission = findViewById(R.id.transmission)
        fuelType = findViewById(R.id.fuel)

        menuButton.setOnClickListener { drawerLayout.openDrawer(Gravity.RIGHT) }

        fourWheelsToggle.setOnClickListener { toggleCategory("4 Wheels") }
        twoWheelsToggle.setOnClickListener { toggleCategory("2 Wheels") }

        bookRideButton.setOnClickListener {
            startActivity(Intent(this, BookRideActivity::class.java))
        }

        rentVehicleButton.setOnClickListener {
            Toast.makeText(this, "Already on Rent a Vehicle", Toast.LENGTH_SHORT).show()
        }

        rentNowButton.setOnClickListener {
            val intent = Intent(this, RentFormActivity::class.java)
            startActivity(intent)
        }

        nextVehicleButton.setOnClickListener {
            showNextVehicle()
        }
    }

    private fun initFirebase() {
        database = FirebaseDatabase.getInstance().getReference("vehicles")
    }

    private fun loadVehicles() {
        showLoading(true)
        database.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                vehicleList.clear()
                if (snapshot.exists()) {
                    for (vehicleSnapshot in snapshot.children) {
                        val vehicle = vehicleSnapshot.getValue(Vehicle::class.java)
                        vehicle?.let { vehicleList.add(it) }
                    }
                }
                showLoading(false)
                if (vehicleList.isNotEmpty()) {
                    filterVehiclesByCategory(currentCategory)
                } else {
                    showEmptyState()
                }
            }

            override fun onCancelled(error: DatabaseError) {
                showLoading(false)
                Toast.makeText(this@RentVehicleActivity, "Database error: ${error.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun toggleCategory(category: String) {
        currentCategory = category
        filterVehiclesByCategory(category)

        if (category == "4 Wheels") {
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

    private fun filterVehiclesByCategory(category: String) {
        filteredList = vehicleList.filter { it.category == category }.toMutableList()
        currentVehicleIndex = 0
        showCurrentVehicle()
    }

    private fun showCurrentVehicle() {
        if (filteredList.isNotEmpty()) {
            val vehicle = filteredList[currentVehicleIndex]
            vehicleName.text = vehicle.model ?: "Unknown"
            rentPrice.text = "₱${vehicle.pricePerDay ?: 0}/day"
            seats.text = "Seats: ${vehicle.seats ?: "-"}"
            engine.text = "Engine: ${vehicle.engine ?: "-"}"
            color.text = "Color: ${vehicle.color ?: "-"}"
            transmission.text = "Transmission: ${vehicle.transmission ?: "-"}"
            fuelType.text = "Fuel: ${vehicle.fuelType ?: "-"}"

            Glide.with(this)
                .load(vehicle.imageUrl)
                .placeholder(R.drawable.placeholder_image)
                .into(vehicleImage)

            nextVehicleButton.isEnabled = filteredList.size > 1
            rentNowButton.isEnabled = true
        } else {
            showEmptyState()
        }
    }

    private fun showNextVehicle() {
        if (filteredList.isNotEmpty()) {
            currentVehicleIndex = (currentVehicleIndex + 1) % filteredList.size
            showCurrentVehicle()
        }
    }

    private fun showEmptyState() {
        vehicleName.text = "No Vehicles Available"
        rentPrice.text = ""
        seats.text = ""
        engine.text = ""
        color.text = ""
        transmission.text = ""
        fuelType.text = ""
        vehicleImage.setImageResource(R.drawable.placeholder_image)
        nextVehicleButton.isEnabled = false
        rentNowButton.isEnabled = false
    }

    private fun showLoading(isLoading: Boolean) {
        progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
        rentNowButton.isEnabled = !isLoading
    }

    override fun onBackPressed() {
        if (drawerLayout.isDrawerOpen(Gravity.RIGHT)) {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        } else {
            super.onBackPressed()
        }
    }
}