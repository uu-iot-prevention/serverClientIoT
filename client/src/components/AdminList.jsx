import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import useGetAxios from "../hooks/useGetAxios";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
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

  const divTextStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width:'40vh'
  }

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
            <ListItem key={user._id} >
              <div className="adminItem" style={{ width:'100vh',display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255, 253, 250, 0.5)',padding:'8px', margin:'1px', borderRadius: '10px'}}>
                <div className="text_container" style={divTextStyle}>
                  <Typography sx={{color:'black',justifyContent:'center'}}> {user.email} </Typography>
                  <Typography sx={{color:'black', justifyContent:'center'}}> {user.roles[0]} </Typography>
                </div>
                <div className="button_container" style ={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button sx={{ margin: '0px 15px 0px 15px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateUser(user._id)}
                  >
                  set Admin
                  </Button>

                  <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </ListItem>

          ))}
        </List>
      )}
    </div>
  );
};

export default AdminList;
