package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout

class MainActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var closeMenuButton: ImageButton
    private lateinit var profileImage: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        closeMenuButton = findViewById(R.id.closeMenuButton)
        profileImage = findViewById(R.id.profileImage)

        // Set profile image directly from drawable
        profileImage.setImageResource(R.drawable.profile_placeholder)

        // Set up navigation drawer
        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.RIGHT)
        }

        closeMenuButton.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Set up navigation menu items
        setupNavigationItems()
    }

    private fun setupNavigationItems() {
        // Dashboard - already on this page
        findViewById<android.widget.LinearLayout>(R.id.dashboardItem).setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // My Order
        findViewById<android.widget.LinearLayout>(R.id.myOrderItem).setOnClickListener {
            // Handle my order click
            drawerLayout.closeDrawer(Gravity.RIGHT)
            Toast.makeText(this, "My Order clicked", Toast.LENGTH_SHORT).show()
        }

        // My Profile
        findViewById<android.widget.LinearLayout>(R.id.myProfileItem).setOnClickListener {
            // Handle my profile click
            drawerLayout.closeDrawer(Gravity.RIGHT)
            Toast.makeText(this, "My Profile clicked", Toast.LENGTH_SHORT).show()
        }

        // About Us
        findViewById<android.widget.LinearLayout>(R.id.aboutUsItem).setOnClickListener {
            // Handle about us click
            drawerLayout.closeDrawer(Gravity.RIGHT)
            Toast.makeText(this, "About Us clicked", Toast.LENGTH_SHORT).show()
        }

        // Contact Us
        findViewById<android.widget.LinearLayout>(R.id.contactUsItem).setOnClickListener {
            // Navigate to Contact Us screen
            val intent = Intent(this, ContactUsActivity::class.java)
            startActivity(intent)
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Log Out
        findViewById<android.widget.LinearLayout>(R.id.logOutItem).setOnClickListener {
            // Handle log out click
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}