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

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BaseUrl}/api/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const baseUrl = "https://yano-backend.onrender.com/api";
    const endpoints = {
      bloodPressure: "/blood-pressure",
      bloodGlucose: "/blood-glucose",
      oxygenSaturation: "/blood-oxygen",
      bodyTemperature: "/body-temp",
      heartRate: "/heart-rate",
    };

    const [
      bloodPressureResponse,
      bloodGlucoseResponse,
      oxygenSaturationResponse,
      bodyTemperatureResponse,
      heartRateResponse,
    ] = await Promise.all([
      axios.get(`${baseUrl}${endpoints.bloodPressure}`),
      axios.get(`${baseUrl}${endpoints.bloodGlucose}`),
      axios.get(`${baseUrl}${endpoints.oxygenSaturation}`),
      axios.get(`${baseUrl}${endpoints.bodyTemperature}`),
      axios.get(`${baseUrl}${endpoints.heartRate}`),
    ]);

    const allData = [
      ...bloodPressureResponse.data,
      ...bloodGlucoseResponse.data,
      ...oxygenSaturationResponse.data,
      ...bodyTemperatureResponse.data,
      ...heartRateResponse.data,
    ];

    // Function to calculate average if range is provided
    const calculateAverage = (value) => {
      if (typeof value === "string" && value.includes("-")) {
        const [min, max] = value.split("-").map(Number);
        return (min + max) / 2;
      }
      return value;
    };

    // Group data by date
    const groupedData = {};

    allData.forEach((entry) => {
      const date = new Date(entry.createdAt).toISOString().split("T")[0];

      if (!groupedData[date]) {
        groupedData[date] = {
          date: date,
          bloodPressure: null,
          bloodGlucose: null,
          oxygenSat: null,
          bodytemp: null,
          heartrate: null,
          mood: null,
        };
      }

      if (entry.systolic && entry.diastolic) {
        // Handle blood pressure
        groupedData[date].bloodPressure = calculateAverage(
          `${entry.systolic}-${entry.diastolic}`
        );
      } else if (entry.data) {
        if (entry.unit === "mmol/L") {
          groupedData[date].bloodGlucose = calculateAverage(entry.data);
        } else if (entry.unit === "%") {
          groupedData[date].oxygenSat = calculateAverage(entry.data);
        } else if (entry.unit === "°C") {
          groupedData[date].bodytemp = calculateAverage(entry.data);
        } else if (entry.unit === "bpm") {
          groupedData[date].heartrate = calculateAverage(entry.data);
        }
      }
    });

    // Convert the grouped data into an array
    const transformedData = Object.values(groupedData);

    // Sort the data by date
    transformedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return transformedData;
  } catch (error) {
    console.log(error);
  }
};
