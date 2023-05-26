import { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Alert from '../components/Alert'
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";
import React from "react";

const AdminPage = () => {
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

    return (
    <div>
        {cookies?.token ? (
        <div>
        <Navbar username={user.username} surname={user.surname}></Navbar>
        <Box
        sx={{
          width: {
            sm: "90vw",
            xs: "90vw",
            md: "60vw",
            lg: "60vw",
            xl: "60vw",
          },
        }}
      >
        <Grid container height="10vh">
            <Alert
                id={5}
                type ={"warning"}
                text = {"Tohle je uplně v píči :)"}
            ></Alert>
        </Grid>
        {/* GRID SYSTEM END */}
      </Box>
        <Outlet></Outlet>
        </div>
    ) : (
        <Navigate to={"/login"}></Navigate>
    )}
    </div>
    
  )
}

export default AdminPage