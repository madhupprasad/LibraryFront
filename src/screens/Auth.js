import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function Auth() {
  const [show, setShow] = useState("login");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", top: "200px" }}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => setShow("login")}>Login</Button>
          <Button onClick={() => setShow("signup")}>Signup</Button>
        </ButtonGroup>
      </div>
      <div>{show === "login" ? <Login /> : <Signup />}</div>
    </div>
  );
}

export default Auth;
