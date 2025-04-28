package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView

class MainActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var closeMenuButton: ImageButton
    private lateinit var profileImage: ImageView
    private lateinit var navigationView: NavigationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        closeMenuButton = findViewById(R.id.closeMenuButton)
        profileImage = findViewById(R.id.profileImage)
        navigationView = findViewById(R.id.navigationView)

        // Set profile image
        profileImage.setImageResource(R.drawable.profile_placeholder)

        // Open navigation drawer
        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.RIGHT)
        }

        // Close navigation drawer
        closeMenuButton.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Setup sidebar menu items
        setupNavigationItems()

        // Handle clicking "Rent a Vehicle" on the main page
        findViewById<TextView>(R.id.rentVehicleTitle).setOnClickListener {
            val intent = Intent(this, RentVehicleActivity::class.java)
            startActivity(intent)
        }

        // Handle clicking "Book a Ride" on the main page
        findViewById<TextView>(R.id.bookRideTitle).setOnClickListener {
            val intent = Intent(this, BookRideActivity::class.java)
            startActivity(intent)
        }
    }

    private fun setupNavigationItems() {
        // Find inside navigation view
        navigationView.findViewById<LinearLayout>(R.id.dashboardItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
            // Already on dashboard
        }

        navigationView.findViewById<LinearLayout>(R.id.myOrderItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
            val intent = Intent(this, MyOrderActivity::class.java)
            startActivity(intent)
        }

        navigationView.findViewById<LinearLayout>(R.id.myProfileItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
            val intent = Intent(this, ProfileActivity::class.java)
            startActivity(intent)
        }

        navigationView.findViewById<LinearLayout>(R.id.aboutUsItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
            val intent = Intent(this, AboutUsActivity::class.java)
            startActivity(intent)
        }

        navigationView.findViewById<LinearLayout>(R.id.contactUsItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
            val intent = Intent(this, ContactUsActivity::class.java)
            startActivity(intent)
        }

        navigationView.findViewById<LinearLayout>(R.id.logOutItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish() // Close app after logout
        }
    }
}