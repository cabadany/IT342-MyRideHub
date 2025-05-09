package com.sia.myridehub

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.storage.FirebaseStorage
import java.util.*

class SettingsActivity : AppCompatActivity() {

    private lateinit var fullNameInput: EditText
    private lateinit var emailInput: EditText
    private lateinit var contactInput: EditText
    private lateinit var addressInput: EditText
    private lateinit var usernameInput: EditText
    private lateinit var profileImageView: ImageView
    private lateinit var uploadImageButton: Button
    private lateinit var saveButton: Button
    private lateinit var logoutButton: Button

    private lateinit var firestore: FirebaseFirestore
    private lateinit var storage: FirebaseStorage
    private var imageUri: Uri? = null
    private var userId: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        fullNameInput = findViewById(R.id.fullNameInput)
        emailInput = findViewById(R.id.emailInput)
        contactInput = findViewById(R.id.contactInput)
        addressInput = findViewById(R.id.addressInput)
        usernameInput = findViewById(R.id.usernameInput)
        profileImageView = findViewById(R.id.profileImageView)
        uploadImageButton = findViewById(R.id.uploadImageButton)
        saveButton = findViewById(R.id.saveButton)
        logoutButton = findViewById(R.id.logoutButton)

        firestore = FirebaseFirestore.getInstance()
        storage = FirebaseStorage.getInstance()
        userId = getSharedPreferences("MyRideHubPrefs", MODE_PRIVATE).getString("userId", "") ?: ""

        loadProfile()

        uploadImageButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_PICK)
            intent.type = "image/*"
            startActivityForResult(intent, 1001)
        }

        saveButton.setOnClickListener {
            updateProfile()
        }

        logoutButton.setOnClickListener {
            getSharedPreferences("MyRideHubPrefs", MODE_PRIVATE).edit().clear().apply()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun loadProfile() {
        if (userId.isEmpty()) return
        firestore.collection("users").document(userId).get()
            .addOnSuccessListener { doc ->
                fullNameInput.setText(doc.getString("fullName"))
                emailInput.setText(doc.getString("email"))
                contactInput.setText(doc.getString("contactNumber"))
                addressInput.setText(doc.getString("address"))
                usernameInput.setText(doc.getString("username"))
                val imageUrl = doc.getString("profileImageUrl")
                if (!imageUrl.isNullOrEmpty()) {
                    Glide.with(this).load(imageUrl).into(profileImageView)
                }
            }
    }

    private fun updateProfile() {
        val userMap = mapOf(
            "fullName" to fullNameInput.text.toString(),
            "contactNumber" to contactInput.text.toString(),
            "address" to addressInput.text.toString(),
            "username" to usernameInput.text.toString()
        )

        firestore.collection("users").document(userId).update(userMap)
            .addOnSuccessListener {
                Toast.makeText(this, "Profile updated!", Toast.LENGTH_SHORT).show()
            }

        if (imageUri != null) {
            val ref = storage.reference.child("profile_images/$userId.jpg")
            ref.putFile(imageUri!!)
                .addOnSuccessListener {
                    ref.downloadUrl.addOnSuccessListener { uri ->
                        firestore.collection("users").document(userId)
                            .update("profileImageUrl", uri.toString())
                    }
                }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 1001 && resultCode == Activity.RESULT_OK) {
            imageUri = data?.data
            profileImageView.setImageURI(imageUri)
        }
    }
}