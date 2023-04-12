import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TitleBox from "../components/TitleBox";
import MainLayout from "../layouts/MainLayout";
import RegistrationComponent from "../components/RegistrationComponent";

const RegistrationPage = () => {
  return (
    <MainLayout >
    <Box
      sx={{
        width: {
          sm: "90vw",
          xs: "90vw",
          md: "60vw",
          lg: "60vw",
          xl: "60vw",
        },
      }}
    >
      {/* GRID SYSTEM */}
      <Grid container height="90vh">
        <RegistrationComponent></RegistrationComponent>
        <TitleBox />
      </Grid>
      {/* GRID SYSTEM END */}
    </Box>
  </MainLayout>
  )
}

export default RegistrationPage