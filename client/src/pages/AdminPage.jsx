import { useState } from "react";
//import { Box } from "@mui/material";
//import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminList from "../components/AdminList";
import { useCookies } from "react-cookie";

//import useGetAxios from "../hooks/useGetAxios";
import MainLayout from "../layouts/MainLayout";
import React from "react";

const AdminPage = () => {
    const [user] = useState({
    username: localStorage.getItem("name"),
    surname: localStorage.getItem("surname"),
    });
    const [cookies] = useCookies(["token"]);

    /*const { data, loading, error } = useGetAxios(
        "http://localhost:5003/auth/users "
    );
*/
  //console.log(data);
 // console.log(error?.response.data?.message);

    return (
      <>
    <Navbar username={user.username} surname={user.surname}></Navbar>
    <MainLayout>
      {cookies?.token ? (
        <div className="adminList">
            <AdminList
            ></AdminList>
        </div>
      ) : (
        <Navigate to={"/login"}></Navigate>
      )}
    </MainLayout>
    </>
  )
}

export default AdminPage