import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const getInvitation = async (id: string) => {
  const invitations = await getInvitations();
  if (!invitations) return null;
  return invitations.find((invitation: Invitation) => invitation._id === id);
};

export const getInvitations = async () => {
  try {
    const response = await axios.get(`${API_URL}/subadmin/listInvitation`, {
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

export const sendInvitation = async (data: Invitation) => {
  try {
    const response = await axios.post(
      `${API_URL}/subadmin/sendInvitation`,
      data,
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

export const resendInvitation = async (id: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/subadmin/resendInvitation`,
      { invitationId: id },
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

export const deleteInvitation = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/subadmin/deleteInvitation`,
      {
        data: { invitationId: id },
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

interface Invitation {
  id?: string;
  _id?: string;
  specializationId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}
