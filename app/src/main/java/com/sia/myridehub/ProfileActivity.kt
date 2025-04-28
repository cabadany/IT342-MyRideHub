package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val profileImage: ImageView = findViewById(R.id.profileImage)
        val txtFullName: TextView = findViewById(R.id.txtFullName)
        val txtEmail: TextView = findViewById(R.id.txtEmail)

        val btnEditProfile: Button = findViewById(R.id.btnEditProfile)
        val btnChangePassword: Button = findViewById(R.id.btnChangePassword)
        val btnLogout: Button = findViewById(R.id.btnLogout)

        // Example: Set user's profile info
        txtFullName.text = "Jane Doe"
        txtEmail.text = "janedoe@gmail.com"
        profileImage.setImageResource(R.drawable.profile_placeholder)

        btnEditProfile.setOnClickListener {
                startActivity(Intent(this, EditProfileActivity::class.java))
        }

        btnChangePassword.setOnClickListener {
            startActivity(Intent(this, ChangePasswordActivity::class.java))
        }

        btnLogout.setOnClickListener {
            // Perform logout action here
        }
    }
}