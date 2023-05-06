import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";

const App = () => {
return <div>


<Routes>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/registration" element={<RegistrationPage></RegistrationPage>}></Route>
      <Route path="/home" element={<MainPage></MainPage>}>
      <Route path="*" element={<h1>Page not found...</h1>}></Route>
      </Route>
      
    </Routes>


  </div>
};

export default App;
