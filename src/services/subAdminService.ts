import axios from "axios";

import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

interface SubAdminData {
  _id?: string;
  name: string;
  canSendNoti: boolean;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const subAdminService = {
  // Get list of all sub-admins
  getAll: async (): Promise<SubAdminData> => {
    const response = await axios.get(`${API_URL}/admin/subAdmin/get`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
    return response.data
  },

  // Get single sub-admin by username
  getByUsername: async (username: string) => {
    const response = await axios.get(`${API_URL}/admin/subAdmin/get/${username}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
    return response.data
  },

  // Create new sub-admin
  create: async (data: { name: string; password: string }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('password', data.password)

    const response = await axios.post(`${API_URL}/admin/subAdmin/create`, formData, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
    return response.data
  },

  // Update sub-admin details
  update: async (data: { name: string; password: string }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('password', data.password)

    const response = await axios.put(`${API_URL}/admin/subAdmin/update`, formData, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
    return response.data
  },

  // Delete sub-admin
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/admin/subAdmin/delete?id=${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
    return response.data
  },

  // Update sub-admin password
  updatePassword: async (data: { name: string; password: string }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('password', data.password)

    const response = await axios.put(`${API_URL}/admin/subAdmin/update`, formData, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
    return response.data
  }
}

export default subAdminService;

