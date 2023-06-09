// import { AxiosResponse } from "axios";
import axios from "axios";

export const getDataFromUrl = async (url, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return await axios.get(url, { headers }).then((res) => res);
};

export function checkPasswordEquality(password, confirmPassword) {
  return password === confirmPassword;
}
/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
