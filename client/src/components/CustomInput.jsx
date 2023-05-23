import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { colors } from "../theme";
import React, { useState } from "react";

// interface PropsInfo {
//   name: string;
//   isIconActive: boolean;
//   label: string;
//   placeholder: string;
//   type: string;
//   handlerEvent?: (event: ChangeEvent<HTMLInputElement>) => void;
//   onSubmit:()=>void
// }

const CustomInput = ({
  isIconActive,
  label,
  placeholder,
  type,
  handlerEvent,
  name,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const visiblePasswordFunction = () => {
    setShowPassword((prev) => !prev);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
  };
  const checkType = (type) => {
    if (type === "text") {
      return "text";
    } else {
      return showPassword ? "password" : "text";
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography color="white" pb={1}>
          {label}
        </Typography>
        <Paper
          sx={{
            background: colors.input[500],
            width: "100%",
          }}
        >
          <InputBase
            type={checkType(type)}
            placeholder={placeholder}
            fullWidth
            name={name}
            onChange={handlerEvent}
            onKeyDown={onKeyDown}
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: "5px",
            }}
            endAdornment={
              isIconActive && (
                <InputAdornment
                  position="end"
                  sx={{ pr: 1 }}
                  onClick={visiblePasswordFunction}
                >
                  <IconButton edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomInput;
