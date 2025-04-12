package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.text.SpannableString
import android.text.Spanned
import android.text.TextPaint
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.firebase.auth.FirebaseAuth

class LoginActivity : AppCompatActivity() {

    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var forgotPasswordTextView: TextView
    private lateinit var loginButton: Button
    private lateinit var signUpTextView: TextView

    // Firebase
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Firebase Auth init
        auth = FirebaseAuth.getInstance()

        // Initialize views
        emailEditText = findViewById(R.id.etUsername)
        passwordEditText = findViewById(R.id.etPassword)
        forgotPasswordTextView = findViewById(R.id.tvForgotPassword)
        loginButton = findViewById(R.id.btnLogin)
        signUpTextView = findViewById(R.id.tvSignUp)

        // Forgot Password
        forgotPasswordTextView.setOnClickListener {
            Toast.makeText(this, "Forgot Password clicked", Toast.LENGTH_SHORT).show()
            // Navigate to ForgotPasswordActivity if needed
        }

        // "Sign Up" clickable
        val signUpText = "Don't have an account? Sign Up"
        val signUpSpannable = SpannableString(signUpText)
        val signUpClickableSpan = object : ClickableSpan() {
            override fun onClick(widget: View) {
                val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
                startActivity(intent)
            }

            override fun updateDrawState(ds: TextPaint) {
                super.updateDrawState(ds)
                ds.color = ContextCompat.getColor(this@LoginActivity, android.R.color.white)
                ds.isUnderlineText = true
            }
        }

        val signUpStartIndex = signUpText.indexOf("Sign Up")
        signUpSpannable.setSpan(signUpClickableSpan, signUpStartIndex, signUpStartIndex + "Sign Up".length,
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)

        signUpTextView.text = signUpSpannable
        signUpTextView.movementMethod = LinkMovementMethod.getInstance()

        // Login button listener
        loginButton.setOnClickListener {
            if (validateInputs()) {
                loginUser()
            }
        }
    }

    private fun validateInputs(): Boolean {
        if (emailEditText.text.toString().trim().isEmpty()) {
            emailEditText.error = "Email is required"
            return false
        }

        if (passwordEditText.text.toString().isEmpty()) {
            passwordEditText.error = "Password is required"
            return false
        }

        return true
    }

    private fun loginUser() {
        val email = emailEditText.text.toString().trim()
        val password = passwordEditText.text.toString()

        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Login successful!", Toast.LENGTH_LONG).show()

                    // Navigate to main app screen
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                } else {
                    Toast.makeText(this, "Login failed: ${task.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
    }
}