import { calculateAverage } from "@/helpers/calculateAverage";
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
    const BaseUrl = "https://yano-backend.onrender.com/api";
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
      axios.get(`${BaseUrl}${endpoints.bloodPressure}`),
      axios.get(`${BaseUrl}${endpoints.bloodGlucose}`),
      axios.get(`${BaseUrl}${endpoints.oxygenSaturation}`),
      axios.get(`${BaseUrl}${endpoints.bodyTemperature}`),
      axios.get(`${BaseUrl}${endpoints.heartRate}`),
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

export async function fetchDataAndCalculateAverage() {
  const BaseUrl = "https://yano-backend.onrender.com/api";

  // Define the endpoints
  const endpoints = {
    bloodPressure: "/blood-pressure",
    bloodGlucose: "/blood-glucose",
    oxygenSaturation: "/blood-oxygen",
    bodyTemperature: "/body-temp",
    heartRate: "/heart-rate",
  };

  try {
    const [
      bloodPressureResponse,
      bloodGlucoseResponse,
      oxygenSaturationResponse,
      bodyTemperatureResponse,
      heartRateResponse,
    ] = await Promise.all([
      axios.get(`${BaseUrl}${endpoints.bloodPressure}`),
      axios.get(`${BaseUrl}${endpoints.bloodGlucose}`),
      axios.get(`${BaseUrl}${endpoints.oxygenSaturation}`),
      axios.get(`${BaseUrl}${endpoints.bodyTemperature}`),
      axios.get(`${BaseUrl}${endpoints.heartRate}`),
    ]);

    // Calculate the average values
    const bloodPressureData = bloodPressureResponse.data || [];
    const avgSystolic = calculateAverage(bloodPressureData, "systolic");
    const avgDiastolic = calculateAverage(bloodPressureData, "diastolic");
    const bloodPressureUnit = bloodPressureData[0]?.unit || "";
    const avgBloodPressure = `${avgSystolic.toFixed(
      0
    )} - ${avgDiastolic.toFixed(0)}`;

    const avgBloodGlucose = calculateAverage(
      bloodGlucoseResponse.data || [],
      "data"
    );
    const bloodGlucoseUnit = bloodGlucoseResponse.data[0]?.unit || "";
    const avgOxygenSaturation = calculateAverage(
      oxygenSaturationResponse.data || [],
      "data"
    );
    const oxygenSaturationUnit = oxygenSaturationResponse.data[0]?.unit || "";
    const avgBodyTemperature = calculateAverage(
      bodyTemperatureResponse.data || [],
      "data"
    );
    const bodyTemperatureUnit = bodyTemperatureResponse.data[0]?.unit || "";
    const avgHeartRate = calculateAverage(heartRateResponse.data || [], "data");
    const heartRateUnit = heartRateResponse.data[0]?.unit || "";

    // Construct the data array
    const newData = [
      {
        name: "Blood Pressure",
        value: avgBloodPressure,
        unit: bloodPressureUnit,
        rate: 0, // You can calculate the rate of change if needed
        parName: "bloodPressure",
      },
      {
        name: "Blood Glucose",
        value: avgBloodGlucose.toFixed(0),
        unit: bloodGlucoseUnit,
        rate: 0,
        parName: "bloodGlucose",
      },
      {
        name: "Oxygen Saturation",
        value: avgOxygenSaturation.toFixed(0),
        unit: oxygenSaturationUnit,
        rate: 0,
        parName: "oxygenSat",
      },
      {
        name: "Body Temperature",
        value: avgBodyTemperature.toFixed(0),
        unit: bodyTemperatureUnit,
        rate: 0,
        parName: "bodytemp",
      },
      {
        name: "Heart Rate",
        value: avgHeartRate.toFixed(0),
        unit: heartRateUnit,
        rate: 0,
        parName: "heartrate",
      },
      {
        name: "Mood",
        value: avgDiastolic.toFixed(0),
        unit: bloodGlucoseUnit,
        rate: 0,
        parName: "mood",
      },
    ];

    return newData; // Return the newData array
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of error
  }
}
