import React, { useEffect, useState } from "react";
import { Button, Dimmer, Form, Loader } from "semantic-ui-react";
import Info from "./info";

function AuthForm({ type, handleSubmit, showError }) {
  const [cred, setCred] = useState({ username: "", password: "" });
  const handleChange = (key, event) => {
    setCred({ ...cred, [key]: event.target.value });
  };
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const legend = {
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
    padding: "5px 10px",
    fontWeight: "bold",
  };

  const fieldset = {
    border: "2px solid black",
    padding: "20px",
    backgroundColor: "white",
  };

  return (
    <Form>
      <Info showInfo={showError} severity={"error"} />
      <fieldset style={fieldset}>
        <legend style={legend}>{type}</legend>
        <Form.Field>
          <label>User Name</label>
          <input
            value={cred["username"]}
            placeholder="User Name"
            autoComplete="name"
            maxLength="20"
            onChange={() => handleChange("username", event)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            value={cred["password"]}
            placeholder="Password"
            autoComplete="current-password"
            onChange={() => handleChange("password", event)}
            type={toggle ? "text" : "password"}
          />
          <i
            onMouseDown={() => {
              setToggle(true);
            }}
            onMouseUp={() => {
              setToggle(false);
            }}
            style={{
              position: "absolute",
              bottom: "80px",
              right: "32px",
              cursor: "pointer",
              border: "1px solid",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              textAlign: "center",
            }}
          >
            i
          </i>
        </Form.Field>
        <Button
          onClick={() => {
            setLoading(true);
            handleSubmit(cred);
          }}
        >
          {type}
        </Button>
      </fieldset>
    </Form>
  );
}

export default AuthForm;
