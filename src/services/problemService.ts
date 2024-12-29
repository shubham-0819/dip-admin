import axios from "axios";
import { API_URL } from "../config";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

export interface Problem {
  _id?: string;
  problemName: string;
  displayName: string;
  icons: string[];
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const problemService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/problems`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/problems/${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  },

  create: async (data: Problem) => {
    const formData = new FormData();
    formData.append('problemName', data.problemName);
    formData.append('displayName', data.displayName);
    formData.append('price', data.price.toString());
    if (data.icons) {
      data.icons.forEach((icon) => {
        formData.append('icons', icon);
      });
    }

    const response = await axios.post(`${API_URL}/problems`, formData, {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (id: string, data: Partial<Problem>) => {
    const formData = new FormData();
    if (data.problemName) formData.append('problemName', data.problemName);
    if (data.displayName) formData.append('displayName', data.displayName);
    if (data.price) formData.append('price', data.price.toString());
    if (data.icons) {
      data.icons.forEach((icon) => {
        formData.append('icons', icon);
      });
    }

    const response = await axios.put(`${API_URL}/problems/${id}`, formData, {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/problems/${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  }
};

export default problemService;