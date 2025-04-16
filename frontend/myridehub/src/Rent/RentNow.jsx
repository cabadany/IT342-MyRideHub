import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const RentNow = () => {
  const { state } = useLocation();
  const { vehicle } = state || {};

  const [isDriverSelected, setIsDriverSelected] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("12:00 PM");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("12:00 PM");
  const [total, setTotal] = useState(0);

  const handleDriverChange = (event) => {
    setIsDriverSelected(event.target.value === "withDriver");
  };

  const handleCalculateTotal = () => {
    const rentalDays = calculateDays(pickUpDate, returnDate);
    const pricePerDay = vehicle.price;
    const driverFee = isDriverSelected ? 500 : 0;
    setTotal(rentalDays * pricePerDay + driverFee);
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-left">
          {vehicle?.brand} {vehicle?.model}
        </h1>

        <img
          src={vehicle?.image}
          alt={vehicle?.model}
          className="w-full max-w-[600px] mx-auto mb-6 drop-shadow-xl"
        />

        {/* Outer Box */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 bg-[#2c2c2e] p-4">
            <label
              className={`px-6 py-2 rounded-full border-2 font-medium ${
                isDriverSelected
                  ? "border-white bg-black text-white shadow"
                  : "border-gray-500 bg-transparent text-gray-300"
              } cursor-pointer transition`}
            >
              <input
                type="radio"
                value="withDriver"
                checked={isDriverSelected}
                onChange={handleDriverChange}
                className="hidden"
              />
              With Driver
            </label>

            <label
              className={`px-6 py-2 rounded-full border-2 font-medium ${
                !isDriverSelected
                  ? "border-white bg-black text-white shadow"
                  : "border-gray-500 bg-transparent text-gray-300"
              } cursor-pointer transition`}
            >
              <input
                type="radio"
                value="noDriver"
                checked={!isDriverSelected}
                onChange={handleDriverChange}
                className="hidden"
              />
              No Driver
            </label>
          </div>

          {/* Form Section */}
          <div className="bg-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-800 mb-1">Pick up Date</label>
                <input
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="w-full p-2 rounded border border-gray-400 bg-gray-200 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-1">Pick up Time</label>
                <select
                  value={pickUpTime}
                  onChange={(e) => setPickUpTime(e.target.value)}
                  className="w-full p-2 rounded border border-gray-400 bg-gray-200 text-gray-800"
                >
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 mb-1">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-2 rounded border border-gray-400 bg-gray-200 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-1">Return Time</label>
                <select
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full p-2 rounded border border-gray-400 bg-gray-200 text-gray-800"
                >
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-800 font-semibold">Total:</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCalculateTotal}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Calculate
                </button>
                <span className="text-lg text-gray-900 font-semibold">
                  ₱ {total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentNow;
