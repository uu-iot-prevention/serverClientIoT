import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import useWebSocket from "./hooks/useWebSocket";
import "./index.css";
import AuthorisationComponent from "./components/authorisationComponent/AuthorisationComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function generateData() {
  const data = [];
  const startTime = new Date("2023-05-23T05:00:00+02:00");

  for (let i = 0; i < 180; i++) {
    const currentTime = new Date(startTime.getTime() + i * 5 * 60 * 1000);
    const value = Math.random() * (50 - 15) + 15; // Náhodná hodnota mezi 15 a 50

    const dataPoint = {
      time: currentTime.toISOString(),
      value: value.toFixed(1), // Zaokrouhlení na jedno desetinné místo
    };

    data.push(dataPoint);
  }

  return data;
}

// Použití funkce

const App = () => {
  const message = useWebSocket("ws://localhost:5001");
  // const generatedData = generateData();
  // console.log(generatedData);
  // const jsonData = JSON.stringify(generatedData, null, 2);
  return (
    <div>
      <div className="toast">
        <ToastContainer
          closeButton={true}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"colored"}
        />
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/registration"
          element={<RegistrationPage></RegistrationPage>}
        ></Route>
        <Route
          path="/admin"
          element={
            <AuthorisationComponent>
              <AdminPage></AdminPage>
            </AuthorisationComponent>
          }
        ></Route>
        <Route
          path="/"
          element={
            <AuthorisationComponent>
              <MainPage message={message}></MainPage>
            </AuthorisationComponent>
          }
        >
          {" "}
          <Route path="*" element={<h1>Page not found...</h1>}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
