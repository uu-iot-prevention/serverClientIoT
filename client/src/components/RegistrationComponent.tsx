import { Box, Button, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { ChangeEvent, useState } from "react";
import CustomInput from "./CustomInput";
import { NavLink } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface InputsData {
  username: string;
  surname: string;
  email: string;
  password: string;
}
// interface Response {
//   message: string;
//   user: object;
// }

const RegistrationComponent = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [registrationEvent, setRegistrationEvent] = useState<InputsData>({
    username: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<AxiosResponse | AxiosError>();

  const handlerEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const nameInput: string = event.target.name;
    const valueInput: string = event.target.value;
    // @ts-ignore
    setRegistrationEvent({
      ...registrationEvent,
      [nameInput]: valueInput,
    });
  };

  const postRegistration = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(
        "http://localhost:5003/auth/registration",
        { ...registrationEvent }
      );
      setErrors(response.data.message);
      setLoading(false);
      navigate("/login");
    } catch (e: any) {
      setErrors(e.response.data.message);
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
                mt: "30px",
                width: "50px",
                height: "50px",
                bgcolor: "primary.main",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${colors.green[500]}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="white">
                A
              </Typography>
            </Box>

            <Typography color="white" fontWeight="bold" mt={2} mb={3}>
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

          {/* INPUT END */}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[900]}` }}
            onClick={postRegistration}
          >
            Registration
          </Button>
          <NavLink to={"/login"}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, boxShadow: `0 0 20px ${colors.green[900]}` }}
            >
              Sign In
            </Button>
          </NavLink>
          {errors && (
            <Typography color="white" fontWeight="bold" mt={2} mb={3}>
              {`${errors}`}
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default RegistrationComponent;
