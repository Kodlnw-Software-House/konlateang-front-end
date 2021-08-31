import React from "react";
// import Navbar from "./components/Header/Navbar";
// import Footer from "./components/ui/Footer";
import WelcomePage from "./pages/welcome-page";
import PatientLogin from "./pages/patient-login-page";
import HospitalLogin from "./pages/hospital-login-page";
import PatientRegister from "./pages/patient-register-page";
import Notification from "./components/ui/notification-modal";
import Profile from "./pages/withAuth/Profile";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./components/functions/ProtectedRoute";

function App() {
  const theme = useSelector((state) => state.ui.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  return (
    <div data-theme={theme}>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {/* use ProtectedRoute for Navigation Guard */}
      {!isLoggedIn ? (
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
      ) : (
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            component={Profile}
            isAuth={isLoggedIn}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
