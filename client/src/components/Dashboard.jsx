import DataBox from './DataBox';
import GraphBox from './GraphBox';
import AlertBox from './AlertBox';
import coldImg from '../icons/cold.png';
import hotImg from "../icons/hot.png";
import tempImg from "../icons/temp.png";
import sosImg from "../icons/sos.png";
import useGetAxios from "../hooks/useGetAxios";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Axios } from 'axios';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Dashboard(props) {

  



  const id = props.idDashboard
  const [stationData, setStationData]=useState()
  const [cookies] = useCookies(["token"])
  
let tempData;
  useEffect(() => {
    const fetchData = async ()=>{
      const body = {
        idStation: props.idDashboard,
        date: '2023-05-25T16:31:46.000Z'
      }
      fetch('http://localhost:5003/station/temperature', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        }
  
      }).then((r => r.json())).then(data =>{setStationData(data); tempData = data;}).catch(e=>console.log(e));
  }
  fetchData();
  }, []);

let lastTemperature = 0;
let maxTemperature = 0;
let minTemperature = 1000;
if (stationData) {
  lastTemperature = stationData[stationData.length - 1].value
  for (let i = 0; i < stationData.length; i++) {
    if (maxTemperature < stationData[i].value) {
      maxTemperature = stationData[i].value
    }
  }
  for (let i = 0; i < stationData.length; i++) {
    if (minTemperature > stationData[i].value) {
      minTemperature = stationData[i].value
    }
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
    <div className="Dashboard">
        <div>
            <h1 className="DashboardTitle">{props.title}</h1>
        </div>
        <div className="Container">
        {DataBoxes.map((dataBox, index) => (
          <DataBox
            key={index}
            title={dataBox.title}
            data={dataBox.data}
            unit={dataBox.unit}
            img={dataBox.img}
            imgAlt={dataBox.imgAlt}
            color = {dataBox.color}
            status = {dataBox.status}
          />
        ))}
        </div>
        <div className='Container'>
            <GraphBox title="Temperature" dataWithDate={stationData}/>
            <AlertBox title="Alert history"/>
        </div>
        <p>{tempData}</p>
    </div>
  );
}

export default Dashboard;