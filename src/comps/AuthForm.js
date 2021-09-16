import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";

function AuthForm({ type, handleSubmit, showError }) {
  const [cred, setCred] = useState({ username: "", password: "" });
  const handleChange = (key, event) => {
    setCred({ ...cred, [key]: event.target.value });
  };
  const [toggle, setToggle] = useState(false);

  const [closeAlert, setCloseAlert] = useState(true);

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

  useEffect(() => {
    if (showError) {
      setCloseAlert(true);
    }
  }, [showError]);

  return (
    <Form>
      {showError && (
        <Snackbar
          open={closeAlert}
          autoHideDuration={6000}
          onClose={() => {
            setCloseAlert(false);
          }}
        >
          <Alert variant="filled" severity="error">
            {showError}
          </Alert>
        </Snackbar>
      )}

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
        <Button onClick={() => handleSubmit(cred)}>{type}</Button>
      </fieldset>
    </Form>
  );
}

export default AuthForm;
