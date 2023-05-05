// import { AxiosResponse } from "axios";
import axios, { AxiosResponse } from "axios";


export const getDataFromUrl = async(url:string, token:string ):Promise<AxiosResponse>=>{
    const headers= {Authorization:`Bearer ${token}` }   
   return (await axios.get(url,{headers}).then(res=>res))



}