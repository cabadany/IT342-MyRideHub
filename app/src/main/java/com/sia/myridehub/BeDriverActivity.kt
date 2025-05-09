package com.sia.myridehub

import android.os.Bundle
import android.view.Gravity
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import com.google.firebase.database.FirebaseDatabase

class BeDriverActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var navigationView: NavigationView
    private lateinit var submitButton: Button
    private lateinit var agreeCheckBox: CheckBox

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_be_driver)

        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        navigationView = findViewById(R.id.navigationView)
        submitButton = findViewById(R.id.submitButton)
        agreeCheckBox = findViewById(R.id.agreeCheckBox)

        val inputName = findViewById<EditText>(R.id.inputName)
        val inputPhone = findViewById<EditText>(R.id.inputPhone)
        val inputVehicle = findViewById<EditText>(R.id.inputVehicle)

        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.END)
        }

        submitButton.setOnClickListener {
            val name = inputName.text.toString().trim()
            val phone = inputPhone.text.toString().trim()
            val vehicle = inputVehicle.text.toString().trim()

            if (!agreeCheckBox.isChecked) {
                Toast.makeText(this, "You must agree to the terms.", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (name.isEmpty() || phone.isEmpty() || vehicle.isEmpty()) {
                Toast.makeText(this, "Please fill in all fields.", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val application = mapOf(
                "name" to name,
                "phone" to phone,
                "vehicle" to vehicle,
                "status" to "pending"
            )

            val ref = FirebaseDatabase.getInstance().getReference("driver_applications")
            val key = ref.push().key

            if (key != null) {
                ref.child(key).setValue(application).addOnSuccessListener {
                    Toast.makeText(this, "Application submitted successfully!", Toast.LENGTH_LONG).show()
                    inputName.text.clear()
                    inputPhone.text.clear()
                    inputVehicle.text.clear()
                    agreeCheckBox.isChecked = false
                }.addOnFailureListener {
                    Toast.makeText(this, "Submission failed: ${it.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}