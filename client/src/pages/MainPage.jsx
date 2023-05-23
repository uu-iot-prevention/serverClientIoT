import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
// import axios from 'axios';
import { getDataFromUrl } from "../helper/helper";
import useGetAxios from "../hooks/useGetAxios";

const MainPage = () => {
  const [user] = useState({
    username: localStorage.getItem("name"),
    surname: localStorage.getItem("surname"),
  });
  const [cookies] = useCookies(["token"]);

  const { data, loading, error } = useGetAxios(
    "http://localhost:5003/auth/users"
  );

  console.log(data);
  console.log(error?.response.data?.message);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {cookies?.token ? (
        <div>
          <Navbar username={user.username} surname={user.surname}></Navbar>

          <Outlet></Outlet>
        </div>
      ) : (
        <Navigate to={"/login"}></Navigate>
      )}
    </div>
  );
};

export default MainPage;
