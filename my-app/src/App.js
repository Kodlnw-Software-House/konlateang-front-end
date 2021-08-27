import React from "react";
import Navbar from "./components/Header/Navbar";
import WelcomePage from "./pages/welcome-page";
import PatientLogin from "./pages/patient-login-page";
import HospitalLogin from "./pages/hospital-login-page";
import PatientRegister from "./pages/patient-register-page";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./index.css";

function App() {
  const theme = useSelector((state) => state.ui.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div data-theme={theme}>
      {/* check if user has login */}
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/patient-login" exact>
            <PatientLogin />
          </Route>
          <Route path="/hospital-login" exact>
            <HospitalLogin />
          </Route>
          <Route path="/registration" exact>
            <PatientRegister />
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
