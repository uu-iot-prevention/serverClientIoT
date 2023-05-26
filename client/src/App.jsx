import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import useWebSocket from "./hooks/useWebSocket";
import "./index.css";
import AuthorisationComponent from "./components/authorisationComponent/AuthorisationComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  console.log();
  const handleMessage = (message) => {
    console.log(`Přijata zpráva: ${message}`);
  };
  useWebSocket("ws://localhost:5001", handleMessage);

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
          path="/"
          element={
            <AuthorisationComponent>
              <MainPage></MainPage>
            </AuthorisationComponent>
          }
        >
          {" "}
          <Route
            path="/about"
            element={
              <AuthorisationComponent>
                <div>ABOUD</div>
              </AuthorisationComponent>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <AuthorisationComponent>
                <div>dashboard</div>
              </AuthorisationComponent>
            }
          ></Route>
          <Route
            path="/kontact"
            element={
              <AuthorisationComponent>
                <div>kontact</div>
              </AuthorisationComponent>
            }
          ></Route>
          <Route path="*" element={<h1>Page not found...</h1>}></Route>
        </Route>

        <Route path="*" element={<h1>Page not found...</h1>}></Route>
      </Routes>
    </div>
  );
};

export default App;
