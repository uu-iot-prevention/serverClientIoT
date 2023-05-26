import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
// import axios from 'axios';
import { getDataFromUrl } from "../helper/helper";
import useGetAxios from "../hooks/useGetAxios";
//import './App.css';
import coldImg from './../icons/cold.png';
import hotImg from "./../icons/hot.png";
import tempImg from "./../icons/temp.png";
import sosImg from "./../icons/sos.png"
import Dashboard from './../components/Dashboard';

import { toast } from "react-toastify";


import useGetAxios from "../hooks/useGetAxios";
const pokus = () => {
  toast.info("ahoj");
};
const MainPage = () => {
  const [user] = useState({
    username: localStorage.getItem("name"),
    surname: localStorage.getItem("surname"),
  });
  const [cookies] = useCookies(["token"]);

  const { data, loading, error } = useGetAxios("http://localhost:5003/users/");
  useEffect(() => {
    if (error?.response.data?.message) {
      toast.error(error?.response.data?.message);
    }
  }, [error?.response.data?.message]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function generateData(numSamples, intervalMinutes, tempRange, decimalPlaces) {
    const data = [];
    let currentTime = new Date();
  
    for (let i = 0; i < numSamples; i++) {
      const temperature = parseFloat((Math.random() * (tempRange[1] - tempRange[0]) + tempRange[0]).toFixed(decimalPlaces));
      const time = currentTime.toISOString();
  
      data.push({ temperature, time });
  
      // Přidáváme interval v minutách k aktuálnímu času
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }
  
    return data;
  }
  
  const numSamples = 288;
  const intervalMinutes = 20;
  const tempRange = [16, 23];
  const decimalPlaces = 1;
  
  const generatedData = generateData(numSamples, intervalMinutes, tempRange, decimalPlaces);
  
  const lastTemperature = generatedData[generatedData.length -1].temperature; //zjištení poslední teploty

  let maxTemperature = generatedData[0].temperature; //defaultní nastavení prvního členu na maxTemperature
  let minTemperature = generatedData[0].temperature //defaultní nastavení prvního členu na maxTemperature
  for (let i = 0; i < generatedData.length; i++) {
    if (generatedData[i].temperature > maxTemperature) {
      maxTemperature = generatedData[i].temperature
    }
    if (generatedData[i].temperature < minTemperature) {
      minTemperature = generatedData[i].temperature
    }
  }

const DataBoxes = [
  {
    title: "Temperature",
    data: lastTemperature,
    unit: "°C",
    img: tempImg,
    imgAlt: "thermometer",
  },
  {
    title: "Min temperature",
    data: minTemperature,
    unit: "°C",
    img: coldImg,
    imgAlt: "snowflake - low temperature icon",
  },
  {
    title: "Max temperature",
    data: maxTemperature,
    unit: "°C",
    img: hotImg,
    imgAlt: "fire - hot temperature icon",
  },
  {
    title: "Workplace situation",
    data: "OK",
    img: sosImg,
    imgAlt: "SOS text icon",
  },
]

  return (
    <div>
      {cookies?.token ? (
        <div>
          <Navbar username={user.username} surname={user.surname}></Navbar>

          <Dashboard DataBoxes={DataBoxes} generatedData={generatedData}/>

          <button onClick={pokus}>Cklikni</button>

          <Outlet></Outlet>
        </div>
      ) : (
        <Navigate to={"/login"}></Navigate>
      )}
    </div>
  );
};

export default MainPage;
