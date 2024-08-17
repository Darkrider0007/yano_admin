import axios from "axios";

const BaseUrl = "https://yano-backend.onrender.com";

export const sendAMessage = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BaseUrl}/api/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const toggleActive = async (userId, data) => {
  try {
    const res = await axios.put(`${BaseUrl}/api/userdoctor/${userId}`, data);

    return res?.data?.userData;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const changePassword = async (userId, data) => {
  try {
    const res = await axios.put(`${BaseUrl}/api/user/${userId}`, data);

    return res?.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
