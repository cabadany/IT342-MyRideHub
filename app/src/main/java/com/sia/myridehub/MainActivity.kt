package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.ImageButton
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView

class MainActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var navigationView: NavigationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        navigationView = findViewById(R.id.navigationView)

        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.END)
        }

        findViewById<TextView>(R.id.bookRideTitle).setOnClickListener {
            startActivity(Intent(this, BookRideActivity::class.java))
        }

        findViewById<TextView>(R.id.rentVehicleTitle).setOnClickListener {
            startActivity(Intent(this, RentVehicleActivity::class.java))
        }

        setupNavigation()
    }

    private fun setupNavigation() {
        navigationView.setNavigationItemSelectedListener { menuItem ->
            drawerLayout.closeDrawer(Gravity.END)
            when (menuItem.itemId) {
                R.id.nav_booking -> startActivity(Intent(this, BookRideActivity::class.java))
                R.id.nav_rent -> startActivity(Intent(this, RentVehicleActivity::class.java))
                R.id.nav_fare_calculator -> startActivity(Intent(this, FareCalculatorActivity::class.java))
                R.id.nav_terms -> startActivity(Intent(this, TermsConditionsActivity::class.java))
                R.id.nav_history -> startActivity(Intent(this, MyOrderActivity::class.java))
                R.id.nav_be_driver -> startActivity(Intent(this, BeDriverActivity::class.java))
                R.id.nav_appeal_form -> startActivity(Intent(this, ContactUsActivity::class.java))
                R.id.nav_settings -> startActivity(Intent(this, SettingsActivity::class.java))
            }
            true
        }
    }
}