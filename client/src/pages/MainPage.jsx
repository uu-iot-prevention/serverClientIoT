import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
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
  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {cookies?.token ? (
        <div>
          <Navbar username={user.username} surname={user.surname}></Navbar>
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
