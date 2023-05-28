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

const App = () => {
  const message = useWebSocket("ws://localhost:5001");

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
      </Routes>
    </div>
  );
};

export default App;
