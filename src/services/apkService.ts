import axios from "axios";
import { API_URL } from "../config";
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const resendApkLink = async (apkId: string) => {
  return axios.post(
    `${API_URL}/doctor/resend-apk`,
    { invitationId: apkId },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
};

export const sendApkLink = async (data) => {
  return axios.post(`${API_URL}/doctor/send-apk`, data, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

export const getApkLinks = async () => {
  return axios.get(`${API_URL}/doctor/send-apk/list`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

export const getApkLink = async (apkId: string) => {
  return axios.get(`${API_URL}/doctor/send-apk/get/${apkId}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

export const deleteApkLink = async (apkId: string) => {
  return axios.delete(`${API_URL}/doctor/send-apk/delete/${apkId}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};