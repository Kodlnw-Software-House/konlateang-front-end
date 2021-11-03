import React, { useEffect } from "react";
import WelcomePage from "./pages/welcome-page";
import Login from "./pages/Login";
import PatientRegister from "./pages/patient-register-page";
import Notification from "./components/ui/notification-modal";
import ProtectedRoute from "./components/functions/ProtectedRoute";
import AuthRouter from "./pages/withAuth/authentication-router";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AuthAction } from "./redux/auth-slice";
import userService from "./components/functions/services/user-service";
import hospitalService from "./components/functions/services/hospital-service";
import "./index.css";
import { uiActions } from "./redux/ui-slice";
import Health from "./pages/health";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const notification = useSelector((state) => state.ui.notification);
  const currentUser = useSelector((state) => state.auth.user);
  const currentPic = useSelector((state) => state.auth.userPic);

  useEffect(() => {
    if (!currentUser && isLoggedIn) {
      if (role === "PATIENT") {
        userService
          .fetchCurrentPatientProfile()
          .then((response) => {
            const user = { ...response.data.patient };
            dispatch(AuthAction.updateUser({ user }));
            dispatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          })
          .catch((error) => {
            dispatch(
              uiActions.setNoti({
                status: "error",
                title: error.message,
              })
            );
            if (error.response.status === 401) {
              dispatch(AuthAction.userLogedOut());
              return;
            }
          });
      } else if (role === "HOSPITAL") {
        hospitalService
          .fetchCurrentProfile()
          .then((response) => {
            const user = { ...response.data.hospital };
            dispatch(AuthAction.updateUser({ user }));
            dispatch(uiActions.toggleTheme({ theme: "hospitalTheme" }));
          })
          .catch((error) => {
            dispatch(
              uiActions.setNoti({
                status: "error",
                title: error.message,
              })
            );
            if (error.response.status === 401) {
              dispatch(AuthAction.userLogedOut());
              return;
            }
          });
      } else if (role === "ADMIN") {
        console.log("ยินดีต้อนรับ superadmin");
      } else {
        dispatch(AuthAction.userLogedOut());
      }
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
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.key}>
            <Route path="/" exact>
              <WelcomePage />
            </Route>
            <Route path="/patient-login" exact>
              <Login type="PATIENT" />
            </Route>
            <Route path="/hospital-login" exact>
              <Login type="HOSPITAL" />
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
        </AnimatePresence>
      ) : (
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.key}>
            <Route path="/" exact>
              <Redirect to="/kon-la-tieng" />
            </Route>
            <ProtectedRoute
              path="/kon-la-tieng"
              component={AuthRouter}
              isAuth={isLoggedIn}
              userData={currentUser}
              role={role}
              userPic={currentPic}
            />
            <Route path="*">
              <Redirect to="/kon-la-tieng" />
            </Route>
          </Switch>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
