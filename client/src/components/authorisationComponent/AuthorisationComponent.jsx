import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";

const AuthorisationComponent = (props) => {
  const [cookies] = useCookies(["token"]);

  return (
    <Box>
      {cookies?.token ? props.children : <Navigate to={"/login"}></Navigate>}
    </Box>
  );
};

export default AuthorisationComponent;
