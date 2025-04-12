package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth

class DashboardActivity : AppCompatActivity() {

    private lateinit var welcomeTextView: TextView
    private lateinit var logoutButton: Button
    private lateinit var bookRideButton: Button
    private lateinit var viewBookingsButton: Button

    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        auth = FirebaseAuth.getInstance()

        welcomeTextView = findViewById(R.id.tvWelcome)
        logoutButton = findViewById(R.id.btnLogout)
        bookRideButton = findViewById(R.id.btnBookRide)
        viewBookingsButton = findViewById(R.id.btnViewBookings)

        val user = auth.currentUser
        welcomeTextView.text = "Welcome, ${user?.email ?: "User"} 👋"

        logoutButton.setOnClickListener {
            auth.signOut()
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }

        bookRideButton.setOnClickListener {
            // Navigate to booking screen
            // startActivity(Intent(this, BookRideActivity::class.java))
        }

        viewBookingsButton.setOnClickListener {
            // Navigate to booking history screen
            // startActivity(Intent(this, BookingHistoryActivity::class.java))
        }
    }
}