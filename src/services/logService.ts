import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const fetchLogs = async (lines: number = 100) => {
  try {
    const response = await axios.get(`${API_URL}/server/logs`, {
      params: {
        lines,
      },
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
