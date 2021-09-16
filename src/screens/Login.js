import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import AuthForm from "../comps/AuthForm";
import { login } from "../services/auth";
const cookie = new Cookies();

function Login() {
  const history = useHistory();
  const [showError, setShowError] = useState("");

  const handleSubmit = (cred) => {
    if (!cred.username.trim()) {
      setShowError("Username invalid");
    } else if (!cred.password.trim()) {
      setShowError("Password invalid");
    } else {
      login(cred).then(([isRes, resMsg]) => {
        if (isRes) {
          cookie.set("access_token_lib", resMsg["access_token"]);
          history.replace("/");
        } else {
          setShowError(resMsg);
        }
      });
    }
  };

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      type="Login"
      showError={showError}
    ></AuthForm>
  );
}

export default Login;
