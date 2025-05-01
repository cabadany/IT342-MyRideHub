import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "Philippines",
    phone: "",
    reason: "",
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must acknowledge the Code of Conduct to submit.");
      return;
    }

    alert("Appeal submitted successfully!");
    setFormData({
      name: "",
      country: "Philippines",
      phone: "",
      reason: "",
      agree: false
    });
  };

  return (
    <div className="dashboard-page">
      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub" className="dashboard-logo" />
      </div>

      <nav className="main-nav">
        <div className="nav-wrapper">
          <ul className="nav-menu">
            <li><a href="/dashboard">HOME</a></li>
            <li className="dropdown-container">
              <span className="dropdown-toggle">OUR SERVICES ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/booking">Book a Vehicle</a></li>
                <li><a href="/rent">Rent a Vehicle</a></li>
                <li><a href="/fare-calculator">Fare Calculator</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <span className="dropdown-toggle">JOIN US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/be-a-driver">Be a Driver</a></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <span className="dropdown-toggle">CONTACT US ▾</span>
              <ul className="dropdown-menu">
                <li><a href="/passenger-appeal">Passenger Appeal Form</a></li>
              </ul>
            </li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </nav>

      <div className="divider-line"></div>

      <main className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 color-black">Passenger Appeal Form</h1>
        <p className="mb-3 text-gray-700">
          We review our bookings on a regular basis to ensure a good experience for both our drivers and passengers.
          Our review shows that you may not have used our app in accordance with Ride Hub’s Terms of Service and hence
          we have deactivated your access.
        </p>
        <p className="mb-3 text-gray-700">
          Appeal forms submitted will be evaluated based on the merits of the information provided and we will only respond
          to applicants with a strong case for appeal. Our decision is final and no further correspondence will be entertained.
        </p>
        <p className="text-sm italic text-red-600 mb-6">
          *Please note that we reserve the right to pursue legal action if you submit an appeal application and,
          upon further investigation, we collect further evidence of fraudulent activity.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-semibold">Country Registered</label>
            <input type="text" name="country" value={formData.country} disabled className="w-full p-2 border bg-gray-100 rounded" />
          </div>

          <div>
            <label className="block font-semibold">Country Code</label>
            <input type="text" value="Philippines (+63)" disabled className="w-full p-2 border bg-gray-100 rounded" />
          </div>

          <div>
            <label className="block font-semibold">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-semibold">Reason</label>
            <select name="reason" value={formData.reason} onChange={handleChange} required className="w-full p-2 border rounded">
              <option value="">-- Select a reason --</option>
              <option>I may have cancelled too many bookings</option>
              <option>I have more than one passenger account</option>
              <option>I may have outstanding payment for previous ride</option>
              <option>I am not sure why I am being suspended</option>
              <option>Others</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            I hereby acknowledge that I have read, understood, and agree to comply with the Code of Conduct.
          </label>

          <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default ContactUs;