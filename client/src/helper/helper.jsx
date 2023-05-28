// import { AxiosResponse } from "axios";
import axios from "axios";
import { alerts } from "../constant/alert";

export const getDataFromUrl = async (url, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return await axios.get(url, { headers }).then((res) => res);
};

export function checkPasswordEquality(password, confirmPassword) {
  return password === confirmPassword;
}

export function alertFunction(idStation, alert) {
  const id = alert?.split("/")[2];
  const type = alert?.split("/")[1];

  if (idStation !== id) {
    return;
  }
  return alerts[type];
}
/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
