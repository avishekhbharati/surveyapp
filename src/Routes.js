import React, { Component } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Survey from "./Component/survey/index.js";
import Home from "./Component/home/index.js";

export default function Routes(){

    return(
        <Switch>
            <Route path="/survey/:id" component={Survey} />  
            <Route exact path="/" component={Home} />      
        </Switch>
    );
}