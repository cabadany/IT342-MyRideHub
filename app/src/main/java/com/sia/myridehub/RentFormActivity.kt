package com.sia.myridehub

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class RentFormActivity : AppCompatActivity() {

    private lateinit var pickUpDateButton: Button
    private lateinit var returnDateButton: Button
    private lateinit var pickUpTimeButton: Button
    private lateinit var dropOffTimeButton: Button
    private lateinit var confirmButton: Button

    private var pickUpDate: String = ""
    private var returnDate: String = ""
    private var pickUpTime: String = ""
    private var dropOffTime: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rent_form)

        pickUpDateButton = findViewById(R.id.pickUpDateButton)
        returnDateButton = findViewById(R.id.returnDateButton)
        pickUpTimeButton = findViewById(R.id.pickUpTimeButton)
        dropOffTimeButton = findViewById(R.id.dropOffTimeButton)
        confirmButton = findViewById(R.id.confirmButton)

        pickUpDateButton.setOnClickListener { showDatePicker { date ->
            pickUpDate = date
            pickUpDateButton.text = "Pick-up: $date"
        }}

        returnDateButton.setOnClickListener { showDatePicker { date ->
            returnDate = date
            returnDateButton.text = "Return: $date"
        }}

        pickUpTimeButton.setOnClickListener { showTimePicker { time ->
            pickUpTime = time
            pickUpTimeButton.text = "Pick-up: $time"
        }}

        dropOffTimeButton.setOnClickListener { showTimePicker { time ->
            dropOffTime = time
            dropOffTimeButton.text = "Drop-off: $time"
        }}

        confirmButton.setOnClickListener {
            if (validateForm()) {
                Toast.makeText(this, "Booking Confirmed!", Toast.LENGTH_LONG).show()
                finish() // or redirect to booking success page later
            } else {
                Toast.makeText(this, "Please complete all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun showDatePicker(onDateSelected: (String) -> Unit) {
        val calendar = Calendar.getInstance()
        val datePicker = DatePickerDialog(this, { _, year, month, dayOfMonth ->
            val date = "$year-${month + 1}-$dayOfMonth"
            onDateSelected(date)
        }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH))
        datePicker.show()
    }

    private fun showTimePicker(onTimeSelected: (String) -> Unit) {
        val calendar = Calendar.getInstance()
        val timePicker = TimePickerDialog(this, { _, hourOfDay, minute ->
            val formattedTime = String.format("%02d:%02d", hourOfDay, minute)
            onTimeSelected(formattedTime)
        }, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE), true)
        timePicker.show()
    }

    private fun validateForm(): Boolean {
        return pickUpDate.isNotEmpty() && returnDate.isNotEmpty() &&
                pickUpTime.isNotEmpty() && dropOffTime.isNotEmpty()
    }
}