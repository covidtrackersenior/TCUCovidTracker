import React, { useEffect, useState } from "react";
import { Info, Chart, USMap, Calendar, Maps, Nav } from "./components";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/home";
import Detail from "./pages/details";
import About from "./pages/About";
import Symptom from "./pages/Symptom";
import Vaccine from "./pages/Vaccine";
import Infos from "./pages/Infos";

const App = () => {
    return (
        <div>
            <Nav />
            <br />
            <Switch >
                <Route exact path = "/"  component = { home }/>
                <Route path = "/about" component = { About }/>
                <Route path = "/detail"  component = {Detail}/>
                <Route path = "/infos"  component = {Infos}/>
                <Route path = "/about" component = { About }/>
                <Route path = "/symptom" component = { Symptom }/>
                <Route path = "/vaccine" component = { Vaccine }/>
                <Route path = "/about" component = { About }/>
            </Switch >
        </div>
    );
};

export default App;