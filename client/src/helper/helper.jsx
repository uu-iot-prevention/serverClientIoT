// import { AxiosResponse } from "axios";
import axios from "axios";

export const getDataFromUrl = async (url, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return await axios.get(url, { headers }).then((res) => res);
};
