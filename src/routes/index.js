import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./Route";

import InBox from "../pages/InBox";
import Login from "../pages/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={InBox} isPrivate />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
