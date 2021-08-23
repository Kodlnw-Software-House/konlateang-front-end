import React from "react";
import Navbar from "./components/Header/Navbar";
import WelcomePage from "./pages/welcome-page";
import Login from "./pages/login-page";
import { Switch, Route } from "react-router-dom";
import './index.css'

function App() {
  const isLoggedIn = false;
  const theme = "patientTheme";
  return (
    <div data-theme={theme}>
      {/* check if user has login */}
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <Switch>
          <Route path="/" exact>
            <WelcomePage theme={theme}/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <WelcomePage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
