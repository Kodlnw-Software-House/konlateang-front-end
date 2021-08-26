import React from "react";
import Navbar from "./components/Header/Navbar";
import WelcomePage from "./pages/welcome-page";
import PatientLogin from "./pages/patient-login-page";
import HospitalLogin from "./pages/hospital-login-page";
import { Switch, Route, Redirect } from "react-router-dom";
import "./index.css";

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
            <WelcomePage theme={theme} />
          </Route>
          <Route path="/patient-login">
            <PatientLogin />
          </Route>
          <Route path="/hospital-login">
            <HospitalLogin />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
