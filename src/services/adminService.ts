import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

interface AdminData {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  mobile: string;
  password?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isFirst?: boolean;
}

const fetchAdmins = async (): Promise<AdminData[]> => {
  try {
    const response = await axios.get(`${API_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return Array.isArray(response.data.data.docs) ? response.data.data.docs : [];
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
};

const createAdmin = async (adminData: AdminData) => {
  try {
    const response = await axios.post(`${API_URL}/admin`, adminData, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    return null;
  }
};

const updateAdmin = async (id: string, adminData: Partial<AdminData>) => {
  try {
    const response = await axios.put(`${API_URL}/admin/${id}`, adminData, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    return null;
  }
};

const deleteAdmin = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    return null;
  }
};

const getAdminProfile = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return null;
  }
};

const updateAdminPassword = async (id: string, password: string) => {
  const formData = new FormData();
  formData.append('password', password);

  return axios.put(`${API_URL}/admin/password/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

// Collect all functions
const adminServiceFunctions = {
  deleteAdmin,
  getAdminProfile,
  updateAdminPassword,
  fetchAdmins,
  createAdmin,
  updateAdmin
};

// Export all functions at the bottom
export {
  deleteAdmin,
  getAdminProfile,
  updateAdminPassword,
  fetchAdmins,
  createAdmin,
  updateAdmin
};

export default adminServiceFunctions;

export type { AdminData };


