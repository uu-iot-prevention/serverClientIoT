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

  const { DataBoxes } = props;
  const id = props.idDashboard
  const [stationData, setStationData]=useState()
  const [cookies] = useCookies(["token"])
  //console.log(cookies);



  // const { data, loading, error } = useGetAxios(
  //   "http://localhost:5003/station/temperature", { params: {id: "id"}}
  // );
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
console.log(stationData);
  
// console.log(props.idDashboard, data)
// console.log(tempData)
// fetchData();

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
            data={tempData}
            unit={dataBox.unit}
            img={dataBox.img}
            imgAlt={dataBox.imgAlt}
          />
        ))}
        </div>
        <div className='Container'>
            <GraphBox title="Temperature" dataWithDate={tempData}/>
            <AlertBox title="Alert history"/>
        </div>
        <p>{tempData}</p>
    </div>
  );
}

export default Dashboard;