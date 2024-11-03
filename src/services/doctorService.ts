import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctor/get`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDoctor = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/doctor/getDoctor/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


