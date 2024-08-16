import axios from "axios";

const BaseUrl = "https://yano-backend.onrender.com";
export const fetchDoctorData = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/api/userdoctor`);
    return response.data.userData; // Assuming 'userData' is the array we need
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    return [];
  }
};

export const fetchPatientData = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/api/userpatient`);
    return response.data.userData; // Assuming 'userData' is the array we need
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return [];
  }
};

export const fetchDoctorUserData = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/api/userdoctor`);
    return response.data.userData; // Assuming 'userData' is the array we need
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    return [];
  }
};

export const fetchPatientUserData = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/api/userpatient`);
    return response.data.userData; // Assuming 'userData' is the array we need
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return [];
  }
};
