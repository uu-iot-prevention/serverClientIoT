import React from "react";
import { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";
import { useCookies } from 'react-cookie';

const AlertBox = (props) => {
    
  const { title, id } = props;
  const [data, setData] = useState([]);
    const [cookies] = useCookies(["token"]);

  const token = cookies?.token;

  useEffect(() => {
    const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`http://localhost:5003/station/alert-get/${id}`,{headers});
      setData(response.data);
      console.log(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="Alerts">
        <h2 style={{marginLeft:'10px'}}><b>{title}</b></h2>
      {data.reverse().map((data) => (
        <Message 
            key={data._id} 
            id ={data._id} 
            message={data.message} 
            time ={data.time} 
            typ = {data.type[0]}
        />
      ))}
    </div>
  );
};

export default AlertBox;