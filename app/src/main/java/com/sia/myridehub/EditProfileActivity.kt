package com.sia.myridehub

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class EditProfileActivity : AppCompatActivity() {

    private lateinit var etFullName: EditText
    private lateinit var etEmail: EditText
    private lateinit var btnSaveProfile: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_profile)

        etFullName = findViewById(R.id.etFullName)
        etEmail = findViewById(R.id.etEmail)
        btnSaveProfile = findViewById(R.id.btnSaveProfile)

        etFullName.setText("Jane Doe")
        etEmail.setText("janedoe@gmail.com")

        btnSaveProfile.setOnClickListener {
            val fullName = etFullName.text.toString().trim()
            val email = etEmail.text.toString().trim()

            if (fullName.isNotEmpty() && email.isNotEmpty()) {
                // Save changes to your backend or local storage here
                Toast.makeText(this, "Profile updated successfully", Toast.LENGTH_SHORT).show()
                finish()
            } else {
                Toast.makeText(this, "Please complete all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }
}