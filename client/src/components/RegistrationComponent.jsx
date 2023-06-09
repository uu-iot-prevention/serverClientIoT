import {
  Box,
  Button,
  colors,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logo } from "./Navbar";
import { toast } from "react-toastify";
import { checkPasswordEquality } from "../helper/helper";

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

const RegistrationComponent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [samePassword, setSamePassword] = useState(false);
  const [againPassword, setAgainePassword] = useState("");
  const [registrationEvent, setRegistrationEvent] = useState({
    username: "",
    surname: "",
    email: "",
    password: "",
  });

  const checkPassword = (password, confirmPassword) => {
    setSamePassword(false);
    if (!password) {
      return;
    }
    if (!confirmPassword) {
      return;
    }
    setSamePassword(true);
    if (checkPasswordEquality(password, confirmPassword)) {
      setSamePassword(false);
    } else {
      setSamePassword(true);
    }
  };
  const funcAgainePassword = (event) => {
    setAgainePassword(event.target.value);
  };
  useEffect(() => {
    checkPassword(registrationEvent?.password, againPassword);
  }, [againPassword, registrationEvent?.password]);
  const handlerEvent = (event) => {
    const nameInput = event.target.name;
    const valueInput = event.target.value;

    setRegistrationEvent({
      ...registrationEvent,
      [nameInput]: valueInput,
    });
  };

  const postRegistration = async () => {
    try {
      if (samePassword) {
        toast.error("Hesla se neshodují");
        return;
      }
      if (!againPassword) {
        // toast.error("Zadejte heslo pro kontrolu");2
        setSamePassword(true);
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5003/auth/registration",
        { ...registrationEvent }
      );
      if (response?.data?.message) {
        toast.success(response.data.message);
      }

      setLoading(false);
      navigate("/login");
    } catch (e) {
      toast.error(e?.response.data.message);
    }
  };
  if (loading) {
    <div>Loading...</div>;
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
            md: "20px 0 0 30px",
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
                mt: "5px",
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img style={{ width: "100px" }} src={logo} alt="logo1"></img>
            </Box>

            <Typography color="white" fontWeight="bold">
              Registration to dashboard
            </Typography>
          </Box>
          <CustomInput
            onSubmit={postRegistration}
            type={"text"}
            label="Name"
            name="username"
            placeholder="Enter your name..."
            isIconActive={false}
            handlerEvent={handlerEvent}
          />
          <CustomInput
            onSubmit={postRegistration}
            handlerEvent={handlerEvent}
            type={"text"}
            name="surname"
            label="Surname"
            placeholder="Enter your surname..."
            isIconActive={false}
          />
          <CustomInput
            onSubmit={postRegistration}
            handlerEvent={handlerEvent}
            type={"text"}
            label="Email"
            name="email"
            placeholder="Enter your Email..."
            isIconActive={false}
          />
          <CustomInput
            onSubmit={postRegistration}
            handlerEvent={handlerEvent}
            type={"password"}
            label="Password"
            placeholder="Enter your password..."
            name="password"
            isIconActive={true}
          />

          <CustomInput
            onSubmit={postRegistration}
            handlerEvent={funcAgainePassword}
            type={"password"}
            label="Password again"
            placeholder="Enter your password..."
            name="password_again"
            isIconActive={true}
            style={samePassword}
          />
          {/* INPUT END */}
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                boxShadow: `0 0 20px ${colors.red[900]}`,
                backgroundColor: "red",
                color: "white",
              }}
              onClick={postRegistration}
            >
              Registration
            </Button>
            <NavLink to={"/login"}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  boxShadow: `0 0 20px ${colors.red[900]}`,
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Sign In
              </Button>
            </NavLink>
          </ThemeProvider>
        </Box>
      </Box>
    </Grid>
  );
};

export default RegistrationComponent;
