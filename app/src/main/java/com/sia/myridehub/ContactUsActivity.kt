package com.sia.myridehub

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.sia.myridehub.R

class ContactUsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contact_us)

        val nameInput = findViewById<EditText>(R.id.input_name)
        val phoneInput = findViewById<EditText>(R.id.input_phone)
        val reasonSpinner = findViewById<Spinner>(R.id.spinner_reason)
        val agreeCheckbox = findViewById<CheckBox>(R.id.checkbox_agree)
        val submitButton = findViewById<Button>(R.id.button_submit)

        ArrayAdapter.createFromResource(
            this,
            R.array.appeal_reasons,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            reasonSpinner.adapter = adapter
        }

        submitButton.setOnClickListener {
            val name = nameInput.text.toString()
            val phone = phoneInput.text.toString()
            val reason = reasonSpinner.selectedItem.toString()
            val agreed = agreeCheckbox.isChecked

            if (!agreed) {
                Toast.makeText(this, "You must acknowledge the Code of Conduct to submit.", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Normally save to database or send to server here
            Toast.makeText(this, "Appeal submitted successfully!", Toast.LENGTH_LONG).show()

            nameInput.text.clear()
            phoneInput.text.clear()
            reasonSpinner.setSelection(0)
            agreeCheckbox.isChecked = false
        }
    }
}