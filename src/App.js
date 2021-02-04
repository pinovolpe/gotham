import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Detenuti from "./components/detenuti";
import DetenutoForm from "./components/detenutoForm";
import Guardie from "./components/guardie";
import GuardiaForm from "./components/guardiaForm";
import Home from "./components/home";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/detenuti/:id" component={DetenutoForm} />
            <Route path="/detenuti" component={Detenuti} />
            <Route path="/guardie/:id" component={GuardiaForm} />
            <Route path="/guardie" component={Guardie} />
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
