package com.sia.myridehub

import android.os.Bundle
import android.view.Gravity
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout

class MainActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var closeMenuButton: ImageButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        closeMenuButton = findViewById(R.id.closeMenuButton)

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
        // Dashboard
        findViewById<android.widget.LinearLayout>(R.id.dashboardItem).setOnClickListener {
            // Handle dashboard click
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // My Order
        findViewById<android.widget.LinearLayout>(R.id.myOrderItem).setOnClickListener {
            // Handle my order click
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // My Profile
        findViewById<android.widget.LinearLayout>(R.id.myProfileItem).setOnClickListener {
            // Handle my profile click
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // About Us
        findViewById<android.widget.LinearLayout>(R.id.aboutUsItem).setOnClickListener {
            // Handle about us click
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Contact Us
        findViewById<android.widget.LinearLayout>(R.id.contactUsItem).setOnClickListener {
            // Handle contact us click
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Log Out
        findViewById<android.widget.LinearLayout>(R.id.logOutItem).setOnClickListener {
            // Handle log out click
            // Example: navigate to login screen
            // val intent = Intent(this, LoginActivity::class.java)
            // startActivity(intent)
            // finish()
        }
    }
}