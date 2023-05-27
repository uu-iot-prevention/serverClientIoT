import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const Message = ({ id, type, text }) => {
  return (
    <Alert severity={type}>
      <AlertTitle>{id}</AlertTitle>
      {text}
    </Alert>
  );
};

export default Message;