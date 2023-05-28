import DataBox from './DataBox';
import GraphBox from './GraphBox';
import AlertBox from './AlertBox';
import coldImg from '../icons/cold.png';
import hotImg from "../icons/hot.png";
import tempImg from "../icons/temp.png";
import sosImg from "../icons/sos.png";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function Dashboard(props) {
  const [selectedDate, setSelectedDate] = useState(new Date()) //Nastavení data pomocí komponenty react-datepicker
  var inputDate = selectedDate; //datum z react-datepicker
  var date = new Date(inputDate);
  var outputDate = date.toISOString(); // Převod na formát ISO 8601
  
  const id = props.idDashboard
  const [stationData, setStationData]=useState()
  const [cookies] = useCookies(["token"])
  
  let tempData;
    useEffect(() => {
      const fetchData = async ()=>{
        const body = {
          idStation: props.idDashboard,
          date: outputDate
        }
        fetch('http://localhost:5003/station/temperature', {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${ cookies.token }`,
            "Content-Type": "application/json",
          }
    
        }).then((r => r.json())).then(data =>{ setStationData(data); tempData = data; }).catch(e=>console.log(e));
    }
    fetchData();
    }, [outputDate]);
  //console.log(outputDate)

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
  //console.log("2023-05-25T16:31:46.000Z")
  //console.log(new Date()) //např. Sat May 27 2023 22:36:38 GMT+0200 (Central European Summer Time)


  const DataBoxes = [
    {
      title: "Temperature",
      data: lastTemperature,
      unit: "°C",
      img: tempImg,
      imgAlt: "thermometer",
      color:'253,148,4,0.5'
    },
    {
      title: "Min temperature",
      data: minTemperature,
      unit: "°C",
      img: coldImg,
      imgAlt: "snowflake - low temperature icon",
      color:'0,68,251,0.5',
    },
    {
      title: "Max temperature",
      data: maxTemperature,
      unit: "°C",
      img: hotImg,
      imgAlt: "fire - hot temperature icon",
      title: "Max temperature",
      color:'254,88,3,0.5'
    },
    {
      title: "Workplace situation",
      data: "OK",
      img: sosImg,
      imgAlt: "SOS text icon",
      color:'255,255,255,0.5',
    },
  ]

  //console.log(selectedDate)

  //var inputDate = selectedDate; //datum z react-datepicker
  //var date = new Date(inputDate);
  //var outputDate = date.toISOString(); // Převod na formát ISO 8601

  //console.log(outputDate);



  return (
    <div className="Dashboard">
        <div>
            <h1 className="DashboardTitle">{ props.title }</h1>
        </div>
        <div className="Container">
        { DataBoxes.map((dataBox, index) => (
          <DataBox

            key = { index }
            title = { dataBox.title }
            data = {dataBox.data }
            unit = {dataBox.unit }
            img = { dataBox.img }
            imgAlt = { dataBox.imgAlt }
            color = { dataBox.color }
          />
        ))}
        </div>

        <div className = 'ContainerData'>
            <GraphBox 
              title = "Temperature" 
              dataWithDate = { stationData }
            />
            
            <AlertBox 
              title = "Alert history"
              id = {id}
            />

        </div>
        <div className="DatePicker">
          <p>Choose a date: </p>
          <DatePicker 
                selected = { selectedDate } 
                onChange = { date => 
                  setSelectedDate(date) 
                }
                dateFormat = "dd/MM/yyyy"
                maxDate = { new Date() }
                showYearDropdown = { true }
                scrollableMonthYearDropdown = { true }
                calendarStartDay={ 1 }
            />
          </div>
      </div>
  );
}

export default Dashboard;