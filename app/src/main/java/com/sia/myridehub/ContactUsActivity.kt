package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
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

        // Initialize views
        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        closeMenuButton = findViewById(R.id.closeMenuButton)
        navigationView = findViewById(R.id.navigationView)
        firstNameEditText = findViewById(R.id.etFirstName)
        lastNameEditText = findViewById(R.id.etLastName)
        emailEditText = findViewById(R.id.etEmail)
        messageEditText = findViewById(R.id.etMessage)
        sendButton = findViewById(R.id.btnSend)

        // ✅ Correct Firebase database URL
        databaseReference = FirebaseDatabase
            .getInstance("https://my-ride-hub-ab024-default-rtdb.firebaseio.com/")
            .getReference("inquiries")

        // Drawer button actions
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

        sendButton.isEnabled = false
        sendButton.text = "Sending..."

        databaseReference.child(inquiryId).setValue(inquiryData)
            .addOnCompleteListener { task ->
                sendButton.isEnabled = true
                sendButton.text = "Send"

                if (task.isSuccessful) {
                    Toast.makeText(this, "Inquiry sent successfully!", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this, InquirySuccessActivity::class.java))
                    finish()
                } else {
                    Toast.makeText(this, "Failed to send inquiry: ${task.exception?.message}", Toast.LENGTH_LONG).show()
                }
            }
            .addOnFailureListener { exception ->
                sendButton.isEnabled = true
                sendButton.text = "Send"
                Toast.makeText(this, "Error: ${exception.message}", Toast.LENGTH_LONG).show()
            }
    }
}