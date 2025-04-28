package com.sia.myridehub

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class EditProfileActivity : AppCompatActivity() {

    private lateinit var etFullName: EditText
    private lateinit var etEmail: EditText
    private lateinit var btnSaveProfile: Button

    private lateinit var auth: FirebaseAuth
    private lateinit var database: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_profile)

        etFullName = findViewById(R.id.etFullName)
        etEmail = findViewById(R.id.etEmail)
        btnSaveProfile = findViewById(R.id.btnSaveProfile)

        auth = FirebaseAuth.getInstance()
        database = FirebaseDatabase.getInstance().getReference("users")

        val currentUser = auth.currentUser
        if (currentUser != null) {
            val userId = currentUser.uid

            // Load existing profile
            database.child(userId).get().addOnSuccessListener { snapshot ->
                if (snapshot.exists()) {
                    etFullName.setText(snapshot.child("fullName").value.toString())
                    etEmail.setText(snapshot.child("email").value.toString())
                }
            }

            btnSaveProfile.setOnClickListener {
                val fullName = etFullName.text.toString().trim()
                val email = etEmail.text.toString().trim()

                if (fullName.isNotEmpty() && email.isNotEmpty()) {
                    val updates = mapOf(
                        "fullName" to fullName,
                        "email" to email
                    )

                    database.child(userId).updateChildren(updates).addOnSuccessListener {
                        Toast.makeText(this, "Profile updated successfully", Toast.LENGTH_SHORT).show()
                        finish()
                    }.addOnFailureListener {
                        Toast.makeText(this, "Failed to update profile", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this, "Please complete all fields", Toast.LENGTH_SHORT).show()
                }
            }
        } else {
            Toast.makeText(this, "User not logged in", Toast.LENGTH_SHORT).show()
            finish()
        }
    }
}