package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout

class ContactUsActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var closeMenuButton: ImageButton
    private lateinit var profileImage: ImageView
    private lateinit var firstNameEditText: EditText
    private lateinit var lastNameEditText: EditText
    private lateinit var emailEditText: EditText
    private lateinit var messageEditText: EditText
    private lateinit var sendButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contact_us)

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        closeMenuButton = findViewById(R.id.closeMenuButton)
        profileImage = findViewById(R.id.profileImage)
        firstNameEditText = findViewById(R.id.etFirstName)
        lastNameEditText = findViewById(R.id.etLastName)
        emailEditText = findViewById(R.id.etEmail)
        messageEditText = findViewById(R.id.etMessage)
        sendButton = findViewById(R.id.btnSend)

        // Set profile image directly from drawable
        profileImage.setImageResource(R.drawable.profile_placeholder)

        // Set up navigation drawer
        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.RIGHT)
        }

        closeMenuButton.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        // Set up send button
        sendButton.setOnClickListener {
            if (validateForm()) {
                // Send the inquiry
                sendInquiry()
            }
        }

        // Set up navigation menu items
        setupNavigationItems()
    }

    private fun validateForm(): Boolean {
        var isValid = true

        // Validate first name
        if (firstNameEditText.text.toString().trim().isEmpty()) {
            firstNameEditText.error = "First name is required"
            isValid = false
        }

        // Validate last name
        if (lastNameEditText.text.toString().trim().isEmpty()) {
            lastNameEditText.error = "Last name is required"
            isValid = false
        }

        // Validate email
        val email = emailEditText.text.toString().trim()
        if (email.isEmpty()) {
            emailEditText.error = "Email is required"
            isValid = false
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            emailEditText.error = "Please enter a valid email address"
            isValid = false
        }

        // Validate message
        if (messageEditText.text.toString().trim().isEmpty()) {
            messageEditText.error = "Message is required"
            isValid = false
        }

        return isValid
    }

    private fun sendInquiry() {
        // Here you would typically send the inquiry to your backend
        // For this example, we'll just show a success message
        Toast.makeText(this, "Your inquiry has been sent successfully!", Toast.LENGTH_LONG).show()

        // Clear the form
        firstNameEditText.text.clear()
        lastNameEditText.text.clear()
        emailEditText.text.clear()
        messageEditText.text.clear()
    }

    private fun setupNavigationItems() {
        // Dashboard
        findViewById<android.widget.LinearLayout>(R.id.dashboardItem).setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
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

        // Contact Us - already on this page
        findViewById<android.widget.LinearLayout>(R.id.contactUsItem).setOnClickListener {
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