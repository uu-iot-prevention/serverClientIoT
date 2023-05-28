import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
//import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
// import axios from 'axios';

import useGetAxios from "../hooks/useGetAxios";
//import './App.css';

import Dashboard from "./../components/Dashboard";

import { toast } from "react-toastify";

const MainPage = (props) => {
  const [user] = useState({
    username: localStorage.getItem("name"),
    surname: localStorage.getItem("surname"),
  });
  // const [cookies] = useCookies(["token"]);

  const { data, loading, error } = useGetAxios(
    "http://localhost:5003/station/stationList"
  );
  useEffect(() => {
    if (error?.response.data?.message) {
      toast.error(error?.response.data?.message);
    }
  }, [error?.response.data?.message]);

  if (!data) {
    return;
  }
  //console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar username={user.username} surname={user.surname}></Navbar>
      <div className="backgroud-main">
        {data &&
          data.map((stations) => {
            return (
              <Dashboard
                message={props.message}
                key={stations.idStation}
                title={stations.stationName}
                idDashboard={stations.idStation}
              />
            );
          })}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainPage;
