import React from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie/es6";
import "../styles/header.scss";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Header({ name, handler }) {
  const history = useHistory();
  const classes = useStyles();
  const handleLogout = (e) => {
    cookies.remove("access_token_lib");
    history.push("/auth");
  };
  return (
    <div className="navbar">
      <div className={classes.flexCenter}>
        <img
          src={"https://img.icons8.com/doodle/96/000000/books.png"}
          width="30"
          height="30"
        />
        <div
          className="title"
          onClick={() => {
            history.go(0);
          }}
        >
          libgen.
        </div>
      </div>
      <div className={classes.flexCenter}>
        <header
          className="header"
          onClick={() => {
            handler(name);
          }}
        >
          {name}'s books
        </header>
        <header className="logout" onClick={handleLogout}>
          logout
        </header>
      </div>
    </div>
  );
}

export default Header;
