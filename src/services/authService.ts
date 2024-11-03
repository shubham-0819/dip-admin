import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registerUser = async (data: CreateAdmin) => {
  try {
    const response = await axios.post(`${API_URL}/admin/createAdmin`, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface CreateAdmin {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}
