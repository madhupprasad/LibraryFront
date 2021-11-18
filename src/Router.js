import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { App } from "./screens/App";
import Auth from "./screens/Auth";

export const userCred = createContext();

const Routes = () => {
  const [userName, setUserName] = useState("");
  return (
    <userCred.Provider value={{ userName, setUserName }}>
      <BrowserRouter>
        <Route exact path="/" component={App}></Route>
        <Route path="/auth" component={Auth}></Route>
      </BrowserRouter>
    </userCred.Provider>
  );
};

ReactDOM.render(<Routes></Routes>, document.getElementById("root"));
