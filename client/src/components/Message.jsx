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
  const dateTime = new Date(time);

const formattedDate = dateTime.toLocaleDateString('cs-CZ', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const formattedTime = dateTime.toLocaleTimeString('cs-CZ', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

const formattedDateTime = `${formattedDate} - ${formattedTime}`;

  return (
    <Alert severity={type} style={{margin:'5px',borderRadius:'10px'}}>
      <AlertTitle>{formattedDateTime}</AlertTitle>
      
        <Typography>{message}</Typography>
        <Typography>{typ}</Typography>
      
    </Alert>
  );
};

export default Message;