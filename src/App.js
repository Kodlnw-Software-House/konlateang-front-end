import React, { useEffect } from "react";
import WelcomePage from "./pages/welcome-page";
import PatientLogin from "./pages/patient-login-page";
import HospitalLogin from "./pages/hospital-login-page";
import PatientRegister from "./pages/patient-register-page";
import Notification from "./components/ui/notification-modal";
import ProtectedRoute from "./components/functions/ProtectedRoute";
import AuthRouter from "./pages/withAuth/authentication-router";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthAction } from "./redux/auth-slice";
import userService from "./components/functions/services/user-service";
import "./index.css";
import { uiActions } from "./redux/ui-slice";
import Health from "./pages/health";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!currentUser && isLoggedIn) {
      userService
        .fetchCurrentPatientProfile()
        .then((response) => {
          const user = response.data;
          dispatch(AuthAction.updateUser({ user }));
        })
        .catch((err) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: err,
            })
          );
          dispatch(AuthAction.userLogedOut());
        });
    }
  }, []);
  return (
    <div data-theme={theme}>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {/* if not Authenticaton, cannot go to Authentication Page */}
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
          <Route path="/health" exact>
            <Health />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            <Redirect to="/kon-la-tieng" />
          </Route>
          <ProtectedRoute
            path="/kon-la-tieng"
            component={AuthRouter}
            isAuth={isLoggedIn}
            userData={currentUser}
          />
          <Route path="*">
            <Redirect to="/kon-la-tieng" />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
