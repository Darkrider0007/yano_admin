import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDoctorData, fetchPatientData } from "@/API/dataFetch";

const Test = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        const doctorData = await fetchDoctorData();
        const patientData = await fetchPatientData();

        // Combine the data in an alternating fashion
        const maxLength = Math.max(doctorData.length, patientData.length);
        const combinedData = [];

        for (let i = 0; i < maxLength; i++) {
          if (i < doctorData.length) {
            combinedData.push(doctorData[i]);
          }
          if (i < patientData.length) {
            combinedData.push(patientData[i]);
          }
        }

        setCombinedData(combinedData); // Store the combined data in state
      } catch (error) {
        console.error("Error combining data:", error);
      }
    };

    fetchAndCombineData(); // Call the function to fetch and combine data
  }, []);

  return (
    <div>
      <h1>Combined Data</h1>
      <ul>
        {combinedData.map((item) => (
          <li key={item._id}>
            {/* Displaying relevant details from each user */}
            {item.firstName} {item.lastName} ({item.userType}) -{" "}
            {item.speciality}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
