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

class AboutUsActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var closeMenuButton: ImageButton
    private lateinit var profileImage: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about_us)

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)

        // Open navigation drawer
        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.RIGHT)
        }

        setupNavigationItems()
    }

    private fun setupNavigationItems() {
        // Dashboard
        findViewById<LinearLayout>(R.id.dashboardItem)?.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // My Order
        findViewById<LinearLayout>(R.id.myOrderItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // My Profile
        findViewById<LinearLayout>(R.id.myProfileItem)?.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // About Us (Current Page)
        findViewById<LinearLayout>(R.id.aboutUsItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Contact Us
        findViewById<LinearLayout>(R.id.contactUsItem)?.setOnClickListener {
            startActivity(Intent(this, ContactUsActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Log Out
        findViewById<LinearLayout>(R.id.logOutItem)?.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}