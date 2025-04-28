package com.sia.myridehub

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Intent
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
    private lateinit var driverRadioGroup: RadioGroup

    private var pickUpDate: String = ""
    private var returnDate: String = ""
    private var pickUpTime: String = ""
    private var dropOffTime: String = ""
    private var withDriver: Boolean = false

    private val baseRentPerDay = 1500 // Example rent per day
    private val driverFeePerDay = 500  // Additional fee if with driver

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rent_form)

        pickUpDateButton = findViewById(R.id.pickUpDateButton)
        returnDateButton = findViewById(R.id.returnDateButton)
        pickUpTimeButton = findViewById(R.id.pickUpTimeButton)
        dropOffTimeButton = findViewById(R.id.dropOffTimeButton)
        confirmButton = findViewById(R.id.confirmButton)
        driverRadioGroup = findViewById(R.id.driverRadioGroup)

        pickUpDateButton.setOnClickListener { showDatePicker { date ->
            pickUpDate = date
            pickUpDateButton.text = "Pick-up: $date"
        } }

        returnDateButton.setOnClickListener { showDatePicker { date ->
            returnDate = date
            returnDateButton.text = "Return: $date"
        } }

        pickUpTimeButton.setOnClickListener { showTimePicker { time ->
            pickUpTime = time
            pickUpTimeButton.text = "Pick-up: $time"
        } }

        dropOffTimeButton.setOnClickListener { showTimePicker { time ->
            dropOffTime = time
            dropOffTimeButton.text = "Drop-off: $time"
        } }

        confirmButton.setOnClickListener {
            if (validateForm()) {
                withDriver = when (driverRadioGroup.checkedRadioButtonId) {
                    R.id.withDriverOption -> true
                    R.id.noDriverOption -> false
                    else -> false
                }

                val totalDays = calculateDays(pickUpDate, returnDate)
                var totalPrice = totalDays * baseRentPerDay
                if (withDriver) {
                    totalPrice += totalDays * driverFeePerDay
                }

                // 🚀 Move to BookingDetailsActivity with passed data
                val intent = Intent(this, BookingDetailsActivity::class.java)
                intent.putExtra("pickupDate", pickUpDate)
                intent.putExtra("returnDate", returnDate)
                intent.putExtra("pickupTime", pickUpTime)
                intent.putExtra("dropoffTime", dropOffTime)
                intent.putExtra("withDriver", withDriver)
                intent.putExtra("totalDays", totalDays)
                intent.putExtra("totalPrice", totalPrice)
                startActivity(intent)
            } else {
                Toast.makeText(this, "Please complete all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun showDatePicker(onDateSelected: (String) -> Unit) {
        val calendar = Calendar.getInstance()
        DatePickerDialog(this, { _, year, month, dayOfMonth ->
            val date = "$year-${month + 1}-$dayOfMonth"
            onDateSelected(date)
        }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH)).show()
    }

    private fun showTimePicker(onTimeSelected: (String) -> Unit) {
        val calendar = Calendar.getInstance()
        TimePickerDialog(this, { _, hourOfDay, minute ->
            val formattedTime = String.format("%02d:%02d", hourOfDay, minute)
            onTimeSelected(formattedTime)
        }, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE), true).show()
    }

    private fun validateForm(): Boolean {
        return pickUpDate.isNotEmpty() && returnDate.isNotEmpty() &&
                pickUpTime.isNotEmpty() && dropOffTime.isNotEmpty() &&
                driverRadioGroup.checkedRadioButtonId != -1
    }

    private fun calculateDays(startDate: String, endDate: String): Int {
        val format = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        return try {
            val start = format.parse(startDate)
            val end = format.parse(endDate)
            val diff = (end.time - start.time) / (1000 * 60 * 60 * 24)
            if (diff <= 0) 1 else diff.toInt()
        } catch (e: Exception) {
            1
        }
    }
}