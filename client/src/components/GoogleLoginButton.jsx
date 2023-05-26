import React from "react";
import { GoogleLogin } from "@react-oauth/google";
const responseGoogle = (response) => {
  console.log(response);
  // Zde můžete provést další akce po úspěšném přihlášení pomocí Google
};
const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      buttonText="Přihlásit se pomocí Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
