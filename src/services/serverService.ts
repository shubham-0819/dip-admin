import axios from "axios";
import { API_URL } from "../config";

export const getServerStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/server`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
