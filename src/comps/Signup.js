import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { signup } from "../services/auth";
import Cookies from "universal-cookie/es6";
import AuthForm from "./AuthForm";
const cookie = new Cookies();

function Signup() {
  const history = useHistory();
  const [showError, setShowError] = useState("");

  const CheckPassword = (inputtxt) => {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (inputtxt.match(passw)) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (cred) => {
    if (!cred.username.trim()) {
      setShowError(new String("Username invalid"));
    } else if (!cred.password.trim()) {
      setShowError(new String("Password invalid"));
    } else if (CheckPassword(cred.password)) {
      setShowError(
        new String(
          "check if the password is between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"
        )
      );
    } else {
      signup(cred).then(([isRes, resMsg]) => {
        if (isRes) {
          cookie.set("access_token_lib", resMsg["access_token"]);
          history.replace("/");
        } else {
          setShowError(new String(resMsg));
        }
      });
    }
  };

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      type="Signup"
      showError={showError}
    ></AuthForm>
  );
}

export default Signup;
