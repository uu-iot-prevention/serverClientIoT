import DataBox from "./DataBox";
import GraphBox from "./GraphBox";
import AlertBox from "./AlertBox";
import coldImg from "../icons/cold.png";
import hotImg from "../icons/hot.png";
import tempImg from "../icons/temp.png";
import sosImg from "../icons/sos.png";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { convertDate } from "../constant/alert";
import { useCookies } from "react-cookie";
import { alerts } from "../constant/alert";
import { Typography } from "@mui/material";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard(props) {
  const idStation = props.idDashboard;
  const [stationData, setStationData] = useState();
  const [cookies] = useCookies(["token"]);
  const [ws, setWs] = useState();
  const [ide, setIde] = useState("");
  const targetRef = useRef(null);
  const [currentData, setCurretnData] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date()); //Nastavení data pomocí komponenty react-datepicker
  var inputDate = selectedDate; //datum z react-datepicker
  var date = new Date(inputDate);
  var outputDate = date.toISOString(); // Převod na formát ISO 8601

  let tempData;

  const fetchCurrenData = async () => {
    const body = {
      idStation: props.idDashboard,
    };
    fetch("http://localhost:5003/station/temperature", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setCurretnData(data);
        tempData = data;
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    const fetchData = async () => {
      const body = {
        idStation: props.idDashboard,
        date: outputDate,
      };
      fetch("http://localhost:5003/station/temperature", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((data) => {
          setStationData(data);
          tempData = data;
        })
        .catch((e) => console.log(e));
    };
    fetchData();
    fetchCurrenData();
  }, [outputDate]);
  useEffect(() => {
    if (!props?.message) {
      return;
    }
    if (props?.message) {
      const string = props?.message;
      setWs(alerts[string.split("/")[1]]);
      setIde(string.split("/")[2]);
    }
  }, [props.message]);

  let lastTemperature = 0;
  let maxTemperature = 0;
  let minTemperature = 1000;
  if (stationData) {
    lastTemperature = stationData[stationData.length - 1].value;
    for (let i = 0; i < stationData.length; i++) {
      if (maxTemperature < stationData[i].value) {
        maxTemperature = stationData[i].value;
      }
    }
    for (let i = 0; i < stationData.length; i++) {
      if (minTemperature > stationData[i].value) {
        minTemperature = stationData[i].value;
      }
    }
  }
  const currentDate = convertDate(stationData?.[0]?.time);

  const currentValueTemperature = currentData?.[currentData?.length - 1];

  const DataBoxes = [
    {
      title:
        stationData === "NO DATA" || !stationData
          ? `Min temperature     No Data`
          : `Min temperature ${currentDate}`,
      data: minTemperature,
      unit: "°C",
      img: coldImg,
      imgAlt: "snowflake - low temperature icon",
      color: "0,68,251,0.5",
    },
    {
      title:
        stationData === "NO DATA" || !stationData
          ? `Max temperature     No Data`
          : `Max temperature ${currentDate}`,
      data: maxTemperature,
      unit: "°C",
      img: hotImg,
      imgAlt: "fire - hot temperature icon",
      color: "254,88,3,0.5",
    },
  ];

  if (ide && ide === idStation) {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  }

  if (stationData === "NO DATA") {
    console.log(stationData);
  }
  return (
    <div className="Dashboard">
      <div>
        <h1 className="DashboardTitle">{props.title}</h1>
      </div>
      <div className="Container" ref={targetRef}>
        <div className="Box" style={{ backgroundColor: `rgb(253,148,4,0.6)` }}>
          <div className="header">
            <h2 style={{ fontWeight: "700" }}>Temperature</h2>
            <img className="img" src={tempImg} alt={"sdffsd"} />
          </div>

          <div className="data">
            <h1>
              {currentValueTemperature
                ? `${currentValueTemperature.value} °C`
                : "No Data"}
            </h1>
          </div>
        </div>
        {DataBoxes.map((dataBox, index) => (
          <DataBox
            idStation={idStation}
            key={index}
            title={dataBox.title}
            data={dataBox.data}
            unit={dataBox.unit}
            img={dataBox.img}
            imgAlt={dataBox.imgAlt}
            color={dataBox.color}
            status={dataBox.status}
          />
        ))}
        <div
          className={
            ide && ide === idStation ? "Box blinking-background" : "Box"
          }
          style={{ backgroundColor: `rgb(${props.color})`, cursor: "pointer" }}
        >
          <div className="header">
            <img className="img" src={sosImg} alt={"asd"} />
          </div>

          <div className="data">
            <h1>
              {ide && ide === idStation ? (
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  {ws}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "30px" }}>{"OK"}</Typography>
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className="datePicker">
        <label style={{ paddingRight: "15px" }}>
          <b>Choose&nbsp;a&nbsp;date:</b>
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          showYearDropdown={true}
          scrollableMonthYearDropdown={true}
          calendarStartDay={1}
        />
      </div>
      <div className="ContainerData">
        <GraphBox title="Temperature" dataWithDate={stationData} />

        <AlertBox title="Alert history" id={idStation} />
      </div>
    </div>
  );
}

export default Dashboard;
