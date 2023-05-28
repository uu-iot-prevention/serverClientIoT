import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Typography } from "@mui/material";

const Message = ({ id, message, time,typ }) => {
  let type="";
  if(typ === "SOS"){
    type = "error"
  }else{
    type = "warning"
  }
 
  return (
    <Alert severity={type} style={{margin:'5px',borderRadius:'10px'}}>
      <AlertTitle>{time}</AlertTitle>
      
        <Typography>{message}</Typography>
        <Typography>{typ}</Typography>
      
    </Alert>
  );
};

export default Message;