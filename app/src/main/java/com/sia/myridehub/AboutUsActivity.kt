package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.ImageButton
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView

class AboutUsActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var profileImage: ImageView
    private lateinit var navigationView: NavigationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about_us)

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        profileImage = findViewById(R.id.profileImage)
        navigationView = findViewById(R.id.navigationView)

        // Set placeholder profile image
        profileImage.setImageResource(R.drawable.profile_placeholder)

        // Open drawer
        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.END)
        }

        setupNavigationItems()
    }

    private fun setupNavigationItems() {
        navigationView.setNavigationItemSelectedListener { menuItem ->
            drawerLayout.closeDrawer(Gravity.END)

            when (menuItem.itemId) {
                R.id.nav_home -> {
                    startActivity(Intent(this, MainActivity::class.java))
                }
                R.id.nav_booking -> {
                    startActivity(Intent(this, BookRideActivity::class.java))
                }
                R.id.nav_rent -> {
                    startActivity(Intent(this, RentVehicleActivity::class.java))
                }
                R.id.nav_fare_calculator -> {
                    startActivity(Intent(this, FareCalculatorActivity::class.java))
                }
                R.id.nav_terms -> {
                    startActivity(Intent(this, TermsConditionsActivity::class.java))
                }
                R.id.nav_history -> {
                    startActivity(Intent(this, MyOrderActivity::class.java))
                }
                R.id.nav_be_driver -> {
                    startActivity(Intent(this, BeDriverActivity::class.java))
                }
                R.id.nav_appeal_form -> {
                    startActivity(Intent(this, ContactUsActivity::class.java)) // Replace if you have a separate AppealActivity
                }
                R.id.nav_settings -> {
                    startActivity(Intent(this, SettingsActivity::class.java))
                }
            }

            true
        }
    }
}