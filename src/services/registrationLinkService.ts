import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const getRegistrationLink = async (id: string) => {
  const registrationLinks = await getRegistrationLinks();
  const registrationLink = registrationLinks.find(
    (registrationLink: RegistrationLink) => registrationLink.id === id
  );
  return registrationLink;
};


export const getRegistrationLinks = async () => {
  try {
    const response = await axios.get(`${API_URL}/registrationlink/list`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createRegistrationLink = async (data: RegistrationLink) => {
  try {
    const response = await axios.post(`${API_URL}/registrationlink/add`, data, {
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

export const removeRegistrationLink = async (
  specializationId: string,
  brandId: string
) => {
  return axios.post(
    `${API_URL}/registrationlink/delete`,
    {
      specializationId: specializationId,
      brandId: brandId,
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
};

interface RegistrationLink {
  id?: string;
  specializationId: string;
  brandId: string;
  link: string;
}
