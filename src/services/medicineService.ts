import axios from "axios";
import { API_URL } from "../config";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

export interface Medicine {
  _id?: string;
  name: string;
  icon: string;
  price: number;
  doctorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const medicineService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/medicines`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/medicines/${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  },

  create: async (data: Medicine) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('doctorId', data.doctorId);
    if (data.icon) {
      formData.append('icon', data.icon);
    }

    const response = await axios.post(`${API_URL}/medicines`, formData, {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (id: string, data: Partial<Medicine>) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.price) formData.append('price', data.price.toString());
    if (data.doctorId) formData.append('doctorId', data.doctorId);
    if (data.icon) formData.append('icon', data.icon);

    const response = await axios.put(`${API_URL}/medicines/${id}`, formData, {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/medicines/${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  }
};

export default medicineService;