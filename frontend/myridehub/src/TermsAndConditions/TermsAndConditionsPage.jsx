import React from "react";
import "./TermsAndConditionsPage.css";

const TermsAndConditionsPage = () => {
  return (
    <div className="terms-page">
      {/* Logo */}
      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
      </div>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-wrapper">
          <ul className="nav-menu">
            <li><a href="/dashboard">HOME</a></li>
            <li className="dropdown-container">
              <span>OUR SERVICES ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/booking">Book a Vehicle</a></li>
                <li><a href="/rent">Rent a Vehicle</a></li>
                <li><a href="/fare-calculator">Fare Calculator</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <span>JOIN US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/be-a-driver">Be a Driver</a></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <span>CONTACT US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/passenger-appeal">Passenger Appeal Form</a></li>
              </ul>
            </li>
            <li><a href="/settings">SETTINGS</a></li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </nav>

      <div className="divider-line"></div>

      {/* Terms Content */}
      <div className="terms-content">
        <h1>Terms and Conditions</h1>
        <p>These Terms and Conditions govern your access to and use of the Ride Hub platform, including its website, services, and any mobile applications associated with Ride Hub. By using our platform, you agree to be bound by these terms.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using Ride Hub, you affirm that you are at least 18 years of age and legally capable of entering into binding contracts. If you do not agree to these Terms, you must not use the services.</p>

        <h2>2. Account Registration</h2>
        <ul>
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
        </ul>

        <h2>3. Vehicle Rental & Booking</h2>
        <ul>
          <li>Bookings and rentals must be made using valid information, including pickup and drop-off locations, dates, and times.</li>
          <li>Users are responsible for inspecting the vehicle condition prior to acceptance and reporting any damages.</li>
          <li>Vehicles must be returned on time. Late returns may incur additional fees.</li>
          <li>Any damages, loss, or traffic violations during rental will be the responsibility of the user.</li>
        </ul>

        <h2>4. Driver Requirements</h2>
        <p>To rent or drive a vehicle through Ride Hub, you must:</p>
        <ul>
          <li>Possess a valid driver’s license appropriate for the type of vehicle.</li>
          <li>Have no major traffic violations or history of reckless driving.</li>
          <li>Consent to any background checks or license verification, as required.</li>
        </ul>

        <h2>5. Fees and Payments</h2>
        <ul>
          <li>Rental and booking fees are displayed during checkout and must be paid in full at the time of reservation.</li>
          <li>Additional charges may apply for fuel, tolls, late returns, or damage.</li>
          <li>Ride Hub reserves the right to update pricing and fees at any time with prior notice.</li>
        </ul>

        <h2>6. Cancellations and Refunds</h2>
        <p>Users may cancel bookings under the following conditions:</p>
        <ul>
          <li>Full refund if cancelled at least 24 hours prior to scheduled pickup.</li>
          <li>Partial or no refund if cancelled within 24 hours, depending on vehicle provider policy.</li>
          <li>Refunds may take 3–7 business days to process.</li>
        </ul>

        <h2>7. User Conduct</h2>
        <p>Users agree not to:</p>
        <ul>
          <li>Use vehicles for illegal activities or transport of prohibited goods.</li>
          <li>Damage, modify, or misrepresent the vehicle in any way.</li>
          <li>Harass, threaten, or harm other users or Ride Hub staff.</li>
        </ul>

        <h2>8. Limitation of Liability</h2>
        <p>Ride Hub is not liable for any direct or indirect damages arising from vehicle usage, user actions, or service interruptions. All liability related to third-party providers, vehicle condition, and on-road incidents lies with the user or provider.</p>

        <h2>9. Suspension and Termination</h2>
        <p>We may suspend or permanently terminate your access to the platform if:</p>
        <ul>
          <li>You breach any part of these Terms and Conditions.</li>
          <li>You misuse the platform or services in a harmful or illegal way.</li>
          <li>You provide false or misleading information.</li>
        </ul>

        <h2>10. Data Privacy</h2>
        <p>Ride Hub collects and processes personal information in accordance with our Privacy Policy. We use your data to facilitate bookings, contact support, and improve service delivery. Your data will not be sold or shared with third parties without your consent, except as required by law.</p>

        <h2>11. Intellectual Property</h2>
        <p>All content, logos, software, and platform assets are the intellectual property of Ride Hub. You may not use, reproduce, or redistribute any content without written permission.</p>

        <h2>12. Governing Law</h2>
        <p>These Terms shall be governed by and interpreted in accordance with the laws of the Republic of the Philippines. Any disputes shall be resolved in the courts of appropriate jurisdiction in the Philippines.</p>

        <h2>13. Modifications</h2>
        <p>We may revise these Terms at any time. Updated versions will be posted on this page. Continued use of Ride Hub services after updates indicates your acceptance of the changes.</p>
      </div>

      {/* Footer Section */}
      <div className="dashboard-footer">
        <div className="footer-links">
          <a href="/passenger-appeal">Passenger Appeal Form</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/fare-calculator">Fare Calculator</a>
        </div>
        <div className="footer-logo">
          <img src="/Ride Hub Logo (White).png" alt="Ride Hub" />
        </div>
      </div>

      <div className="dashboard-copyright">
        ©2025 by RIDE HUB Philippines. All Rights Reserved
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;