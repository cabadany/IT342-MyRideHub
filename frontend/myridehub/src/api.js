import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const saveRental = async (rentalData) => {
  const response = await axios.post(`${API_BASE_URL}/api/rentals`, rentalData);
  return response.data;
};