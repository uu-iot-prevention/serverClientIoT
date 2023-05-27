import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import useGetAxios from "../hooks/useGetAxios";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Typography } from "@mui/material";

const AdminList = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const [render, setRender] = useState(false);
  const { data, loading, error } = useGetAxios("http://localhost:5003/users/");
  const handleDeleteUser = async (userId) => {
    try {
      // const headers = { Authorization: `Bearer ${token}` };
      const config = {
        method: "post",
        url: `http://localhost:5003/users/user-delete/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (!response) {
        return;
      }
      if (response.status === 200) {
        // User was successfully deletedu
      } else {
        // Handle error deleting user
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      const config = {
        method: "post",
        url: `http://localhost:5003/users/user-delete/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios(config);

      if (response.status === 200) {
        // User was successfully updated
      } else {
        // Handle error updating user
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    setRender((prev) => !prev);
  }, [render]);
  return (
    <div>
      {loading ? (
        <CircularProgress /> // Show a loading spinner
      ) : error ? (
        <div>Error fetching data</div> // Show an error message
      ) : (
        <List>
          {data.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={user.name} />
              <Typography sx={{ color: "white" }}> {user.email} </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateUser(user._id)}
              >
                Set to admin
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default AdminList;
