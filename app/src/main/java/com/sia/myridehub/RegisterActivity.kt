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
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class RegisterActivity : AppCompatActivity() {

    private lateinit var usernameEditText: EditText
    private lateinit var emailEditText: EditText
    private lateinit var contactNumberEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var reEnterPasswordEditText: EditText
    private lateinit var termsCheckBox: CheckBox
    private lateinit var termsTextView: TextView
    private lateinit var createAccountButton: Button
    private lateinit var signInTextView: TextView

    // Firebase
    private lateinit var auth: FirebaseAuth
    private lateinit var database: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        // Initialize Firebase
        auth = FirebaseAuth.getInstance()
        database = FirebaseDatabase.getInstance().reference

        // Initialize views
        usernameEditText = findViewById(R.id.etUsername)
        emailEditText = findViewById(R.id.etEmail)
        contactNumberEditText = findViewById(R.id.etContactNumber)
        passwordEditText = findViewById(R.id.etPassword)
        reEnterPasswordEditText = findViewById(R.id.etReEnterPassword)
        termsCheckBox = findViewById(R.id.cbTerms)
        termsTextView = findViewById(R.id.tvTerms)
        createAccountButton = findViewById(R.id.btnCreateAccount)
        signInTextView = findViewById(R.id.tvSignIn)

        // Terms clickable text
        val termsText = "I agree to the Terms & Conditions"
        val spannableString = SpannableString(termsText)
        val clickableSpan = object : ClickableSpan() {
            override fun onClick(widget: View) {
                Toast.makeText(this@RegisterActivity, "Terms & Conditions clicked", Toast.LENGTH_SHORT).show()
            }
        }
        val startIndex = termsText.indexOf("Terms & Conditions")
        spannableString.setSpan(clickableSpan, startIndex, startIndex + "Terms & Conditions".length,
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        termsTextView.text = spannableString
        termsTextView.movementMethod = LinkMovementMethod.getInstance()

        // Sign In clickable text
        val signInText = "Already have an account? Sign In"
        val signInSpannable = SpannableString(signInText)
        val signInClickableSpan = object : ClickableSpan() {
            override fun onClick(widget: View) {
                val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
                startActivity(intent)
                finish()
            }

            override fun updateDrawState(ds: TextPaint) {
                super.updateDrawState(ds)
                ds.color = ContextCompat.getColor(this@RegisterActivity, android.R.color.white)
                ds.isUnderlineText = true
            }
        }
        val signInStartIndex = signInText.indexOf("Sign In")
        signInSpannable.setSpan(signInClickableSpan, signInStartIndex, signInStartIndex + "Sign In".length,
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        signInTextView.text = signInSpannable
        signInTextView.movementMethod = LinkMovementMethod.getInstance()

        // Register user
        createAccountButton.setOnClickListener {
            if (validateInputs()) {
                registerUser()
            }
        }
    }

    private fun validateInputs(): Boolean {
        if (usernameEditText.text.toString().trim().isEmpty()) {
            usernameEditText.error = "Username is required"
            return false
        }

        val email = emailEditText.text.toString().trim()
        if (email.isEmpty()) {
            emailEditText.error = "Email is required"
            return false
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            emailEditText.error = "Enter a valid email address"
            return false
        }

        if (contactNumberEditText.text.toString().trim().isEmpty()) {
            contactNumberEditText.error = "Contact number is required"
            return false
        }

        val password = passwordEditText.text.toString()
        if (password.isEmpty()) {
            passwordEditText.error = "Password is required"
            return false
        } else if (password.length < 6) {
            passwordEditText.error = "Password must be at least 6 characters"
            return false
        }

        val reEnterPassword = reEnterPasswordEditText.text.toString()
        if (reEnterPassword.isEmpty()) {
            reEnterPasswordEditText.error = "Please re-enter your password"
            return false
        } else if (password != reEnterPassword) {
            reEnterPasswordEditText.error = "Passwords do not match"
            return false
        }

        if (!termsCheckBox.isChecked) {
            Toast.makeText(this, "Please accept the Terms & Conditions", Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun registerUser() {
        val username = usernameEditText.text.toString().trim()
        val email = emailEditText.text.toString().trim()
        val contactNumber = contactNumberEditText.text.toString().trim()
        val password = passwordEditText.text.toString()

        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    val userId = auth.currentUser?.uid ?: ""
                    val userMap = mapOf(
                        "username" to username,
                        "email" to email,
                        "contactNumber" to contactNumber
                    )

                    database.child("users").child(userId).setValue(userMap)
                        .addOnCompleteListener { dbTask ->
                            if (dbTask.isSuccessful) {
                                Toast.makeText(this, "Account created successfully!", Toast.LENGTH_LONG).show()
                                startActivity(Intent(this, LoginActivity::class.java))
                                finish()
                            } else {
                                Toast.makeText(this, "Failed to save user data", Toast.LENGTH_SHORT).show()
                            }
                        }
                } else {
                    Toast.makeText(this, "Registration failed: ${task.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
    }
}