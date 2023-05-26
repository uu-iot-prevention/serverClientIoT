import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="829824178601-mf6744k3vgci91iuf0q68118bd1kj34e.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
