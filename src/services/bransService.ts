import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const getbrandList = async () => {
  try {
    const response = await axios.get(`${API_URL}/brand/list`, {
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

export const getbrand = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/brand/details/${id}`, {
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

export const removeBrand = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/brand/delete/${id}`, {
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

export const createBrand = async (data: Brand) => {
  return axios.post(`${API_URL}/brand/create`, data, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

interface Brand {
  name: string;
  createdBy: string;
  updatedBy: string;
}
