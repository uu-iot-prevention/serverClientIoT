import { Box, Button, colors, createTheme, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { ChangeEvent, useState } from "react";
import CustomInput from "./CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@mui/material";

import { logo } from "./Navbar";

// interface SigninPageInput {
//   email: string;
//   password: string;
// }

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "red",
          },
        },
      },
    },
  },
});

const SigninPage = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState();

  const loginFunction = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
    setErrors("");
  };

  const postLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5003/auth/login", {
        ...login,
      });
      setErrors(response.data.message);
      setLoading(false);
      localStorage.setItem("name", response.data.user.username);
      localStorage.setItem("surname", response.data.user.surname);

      setCookie("token", response.data.token);
      navigate("/home");
    } catch (e) {
      setErrors(e.response?.data.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
      minHeight={550}
      sx={{
        boxShadow: {
          xs: "",
          sm: "",
          md: "15px 2px 5px -5px",
          lg: "15px 2px 5px -5px",
          xl: "15px 2px 5px -5px",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 24, 57, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          borderRadius: {
            xs: "30px",
            sm: "30px",
            md: "30px 0 0 30px",
            lg: "30px 0 0 30px",
            xl: "30px 0 0 30px",
          },
        }}
      >
        <Box width="80%">
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* LOGO */}
            <Box
              sx={{
                mt: "60px",
                width: "50px",
                height: "50px",
                // bgcolor: "red",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // boxShadow: `0 0 20px ${colors.red[500]}`,
              }}
            >
              {/* <Typography variant="h6" fontWeight="bold" color="white">
                A

              </Typography> */}

              <img style={{ width: "100px" }} src={logo}></img>
            </Box>

            <Typography color="white" fontWeight="bold" mt={7} mb={3}>
              Sign in to dashboard
            </Typography>
          </Box>

          <CustomInput
            onSubmit={postLogin}
            handlerEvent={loginFunction}
            type={"text"}
            label="Email"
            name="email"
            placeholder="Enter your email..."
            isIconActive={false}
          />
          <CustomInput
            onSubmit={postLogin}
            type={"password"}
            label="Password"
            name="password"
            placeholder="Enter your password..."
            isIconActive={true}
            handlerEvent={loginFunction}
          />

          {/* INPUT END */}
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                boxShadow: `0 0 10px ${colors.red[500]}`,
                backgroundColor: "red",
                color: "white",
              }}
              onClick={postLogin}
            >
              Login
            </Button>
            <NavLink to={"/registration"}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  boxShadow: `0 0 10px ${colors.red[500]}`,
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Registration
              </Button>
            </NavLink>
          </ThemeProvider>
          {errors && (
            <Typography color="white" fontWeight="bold" mt={7} mb={3}>
              {`${errors}`}
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default SigninPage;
