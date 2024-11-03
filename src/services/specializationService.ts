import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const getSpecialization = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/specialization/details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSpecializations = async () => {
  try {
    const response = await axios.get(`${API_URL}/specialization/list`, {
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

export const createSpecialization = async (data: Specialization) => {
  const formData = new FormData();
  formData.append("icons", data.icons);
  formData.append("name", data.name);
  formData.append("createdBy", data.createdBy);
  formData.append("updatedBy", data.updatedBy);

  return axios.post(`${API_URL}/specialization/create`, formData, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateSpecialization = async (
  id: string,
  data: Specialization
) => {
  try {
    const formData = new FormData();
    if (data.icons) {
      formData.append("icons", data.icons);
    }
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.updatedBy) {
      formData.append("updatedBy", data.updatedBy);
    }

    const response = await axios.post(
      `${API_URL}/specialization/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addSepcializationIcon = async (id: string, icon: File) => {
  try {
    const formData = new FormData();
    formData.append("icons", icon);
    const response = await axios.put(
      `${API_URL}/specialization/add-icon/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeSpecializationIcon = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/specialization/remove-icon/${id}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteSpecialization = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/specialization/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface Specialization {
  icons: File;
  name: string;
  createdBy: string;
  updatedBy: string;
}
