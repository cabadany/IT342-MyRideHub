package com.sia.myridehub

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.*
import com.google.firebase.storage.FirebaseStorage

class ProfileActivity : AppCompatActivity() {

    private lateinit var profileImage: ImageView
    private lateinit var txtFullName: TextView
    private lateinit var txtEmail: TextView
    private lateinit var btnEditProfile: Button
    private lateinit var btnChangePassword: Button
    private lateinit var btnLogout: Button

    private lateinit var auth: FirebaseAuth
    private lateinit var database: DatabaseReference
    private lateinit var storage: FirebaseStorage

    private lateinit var selectedImageUri: Uri

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        profileImage = findViewById(R.id.profileImage)
        txtFullName = findViewById(R.id.txtFullName)
        txtEmail = findViewById(R.id.txtEmail)
        btnEditProfile = findViewById(R.id.btnEditProfile)
        btnChangePassword = findViewById(R.id.btnChangePassword)
        btnLogout = findViewById(R.id.btnLogout)

        auth = FirebaseAuth.getInstance()
        database = FirebaseDatabase.getInstance().getReference("users")
        storage = FirebaseStorage.getInstance()

        val currentUser = auth.currentUser
        if (currentUser != null) {
            val userId = currentUser.uid

            // Load profile info
            database.child(userId).get().addOnSuccessListener { snapshot ->
                if (snapshot.exists()) {
                    val fullName = snapshot.child("fullName").value.toString()
                    val email = snapshot.child("email").value.toString()
                    val profileImageUrl = snapshot.child("profileImageUrl").value?.toString()

                    txtFullName.text = fullName
                    txtEmail.text = email

                    if (!profileImageUrl.isNullOrEmpty()) {
                        Glide.with(this)
                            .load(profileImageUrl)
                            .into(profileImage)
                    } else {
                        profileImage.setImageResource(R.drawable.profile_placeholder)
                    }
                }
            }
        }

        // Let user select new profile picture
        profileImage.setOnClickListener {
            pickImage.launch("image/*")
        }

        btnEditProfile.setOnClickListener {
            startActivity(Intent(this, EditProfileActivity::class.java))
        }

        btnChangePassword.setOnClickListener {
            startActivity(Intent(this, ChangePasswordActivity::class.java))
        }

        btnLogout.setOnClickListener {
            auth.signOut()
            Toast.makeText(this, "Logged out", Toast.LENGTH_SHORT).show()
            finish()
        }
    }

    private val pickImage = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        if (uri != null) {
            uploadImageToFirebase(uri)
        }
    }

    private fun uploadImageToFirebase(fileUri: Uri) {
        val userId = auth.currentUser?.uid ?: return
        val storageRef = storage.reference.child("profileImages/$userId.jpg")

        storageRef.putFile(fileUri)
            .addOnSuccessListener {
                storageRef.downloadUrl.addOnSuccessListener { uri ->
                    // Save the download URL to the user's database profile
                    database.child(userId).child("profileImageUrl").setValue(uri.toString())
                    Glide.with(this).load(uri).into(profileImage)
                    Toast.makeText(this, "Profile picture updated!", Toast.LENGTH_SHORT).show()
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Failed to upload profile picture", Toast.LENGTH_SHORT).show()
            }
    }
}