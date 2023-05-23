import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import useWebSocket from "./hooks/useWebSocket";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  console.log();
  const handleMessage = (message) => {
    console.log(`Přijata zpráva: ${message}`);
  };
  useWebSocket("ws://localhost:5000", handleMessage);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/registration"
          element={<RegistrationPage></RegistrationPage>}
        ></Route>
        <Route
          path="/home"
          element={
            token ? <MainPage></MainPage> : <Navigate to={"/login"}></Navigate>
          }
        >
          <Route path="*" element={<h1>Page not found...</h1>}></Route>
        </Route>
        <Route path="*" element={<h1>Page not found...</h1>}></Route>
      </Routes>
    </div>
  );
};

export default App;
