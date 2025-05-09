package com.sia.myridehub

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class TermsConditionsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_terms_conditions)

        val contentView = findViewById<TextView>(R.id.termsContent)

        val content = """
            These Terms and Conditions govern your access to and use of the Ride Hub platform, including its website, services, and mobile apps.

            1. Acceptance of Terms
            You must be at least 18 and legally capable. If not, do not use Ride Hub.

            2. Account Registration
            • Provide accurate info
            • Maintain credentials
            • Accounts violating terms may be suspended

            3. Vehicle Rental & Booking
            • Use valid booking info
            • Inspect vehicle before use
            • Return on time or face late fees
            • You’re responsible for any damage

            4. Driver Requirements
            • Valid driver’s license required
            • No reckless driving history
            • Consent to background checks

            5. Fees and Payments
            • Must be paid in full
            • May include tolls, fuel, damage

            6. Cancellations and Refunds
            • Full refund if cancelled 24+ hours before
            • Partial/no refund if less than 24h
            • Refunds may take 3–7 days

            7. User Conduct
            • No illegal use or harassment
            • Don't damage or misuse vehicles

            8. Limitation of Liability
            • Ride Hub isn’t liable for incidents or service issues

            9. Suspension and Termination
            • You may be banned for violations or misuse

            10. Data Privacy
            • Data used per our Privacy Policy
            • Not shared without consent unless required by law

            11. Intellectual Property
            • All content is property of Ride Hub

            12. Governing Law
            • Governed under the laws of the Philippines

            13. Modifications
            • Terms may change — continued use = agreement
        """.trimIndent()

        contentView.text = content
    }
}