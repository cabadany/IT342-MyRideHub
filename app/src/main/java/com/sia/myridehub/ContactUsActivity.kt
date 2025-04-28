package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class ContactUsActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var closeMenuButton: ImageButton
    private lateinit var profileImage: ImageView
    private lateinit var navigationView: NavigationView
    private lateinit var firstNameEditText: EditText
    private lateinit var lastNameEditText: EditText
    private lateinit var emailEditText: EditText
    private lateinit var messageEditText: EditText
    private lateinit var sendButton: Button
    private lateinit var databaseReference: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contact_us)

        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        closeMenuButton = findViewById(R.id.closeMenuButton)
        profileImage = findViewById(R.id.profileImage)
        navigationView = findViewById(R.id.navigationView)
        firstNameEditText = findViewById(R.id.etFirstName)
        lastNameEditText = findViewById(R.id.etLastName)
        emailEditText = findViewById(R.id.etEmail)
        messageEditText = findViewById(R.id.etMessage)
        sendButton = findViewById(R.id.btnSend)

        profileImage.setImageResource(R.drawable.profile_placeholder)

        databaseReference = FirebaseDatabase
            .getInstance("https://my-ride-hub-ab024-default-rtdb.asia-southeast1.firebasedatabase.app/")
            .getReference("inquiries")

        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.RIGHT)
        }
        closeMenuButton.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        sendButton.setOnClickListener {
            if (validateForm()) {
                sendInquiry()
            }
        }

        setupNavigationItems()
    }

    private fun validateForm(): Boolean {
        var isValid = true

        if (firstNameEditText.text.toString().trim().isEmpty()) {
            firstNameEditText.error = "First name is required"
            isValid = false
        }
        if (lastNameEditText.text.toString().trim().isEmpty()) {
            lastNameEditText.error = "Last name is required"
            isValid = false
        }
        val email = emailEditText.text.toString().trim()
        if (email.isEmpty()) {
            emailEditText.error = "Email is required"
            isValid = false
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            emailEditText.error = "Please enter a valid email address"
            isValid = false
        }
        if (messageEditText.text.toString().trim().isEmpty()) {
            messageEditText.error = "Message is required"
            isValid = false
        }

        return isValid
    }

    private fun sendInquiry() {
        val inquiryId = databaseReference.push().key

        if (inquiryId == null) {
            Toast.makeText(this, "Failed to generate inquiry ID", Toast.LENGTH_SHORT).show()
            return
        }

        val inquiryData = mapOf(
            "firstName" to firstNameEditText.text.toString().trim(),
            "lastName" to lastNameEditText.text.toString().trim(),
            "email" to emailEditText.text.toString().trim(),
            "message" to messageEditText.text.toString().trim()
        )

        databaseReference.child(inquiryId).setValue(inquiryData)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Inquiry sent successfully!", Toast.LENGTH_LONG).show()

                    firstNameEditText.text.clear()
                    lastNameEditText.text.clear()
                    emailEditText.text.clear()
                    messageEditText.text.clear()
                } else {
                    Toast.makeText(this, "Failed: ${task.exception?.message}", Toast.LENGTH_LONG).show()
                }
            }
    }

    private fun setupNavigationItems() {
        navigationView.findViewById<LinearLayout>(R.id.dashboardItem)?.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
        navigationView.findViewById<LinearLayout>(R.id.myOrderItem)?.setOnClickListener {
            startActivity(Intent(this, MyOrderActivity::class.java))
            finish()
        }
        navigationView.findViewById<LinearLayout>(R.id.myProfileItem)?.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
            finish()
        }
        navigationView.findViewById<LinearLayout>(R.id.aboutUsItem)?.setOnClickListener {
            startActivity(Intent(this, AboutUsActivity::class.java))
            finish()
        }
        navigationView.findViewById<LinearLayout>(R.id.contactUsItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }
        navigationView.findViewById<LinearLayout>(R.id.logOutItem)?.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}