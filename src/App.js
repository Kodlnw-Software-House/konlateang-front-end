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
            const user = { ...response.data.patient, role: "PATIENT" };
            dispatch(AuthAction.updateUser({ user }));
            dispatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          })
          .catch(() => {
            dispatch(
              uiActions.setNoti({
                status: "error",
                title: "ไม่สามารถเรียกข้อมูลผู้ใช่ได้",
              })
            );
            dispatch(AuthAction.userLogedOut());
          });
      } else if (role === "HOSPITAL") {
        dispatch(uiActions.toggleTheme({ theme: "hospitalTheme" }));
        console.log("fetching hospital account data");
      } else {
        console.log("fetching superadmin data");
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
      ) : role === "PATIENT" ? (
        <Switch>
          <Route path="/" exact>
            <Redirect to="/kon-la-tieng" />
          </Route>
          <ProtectedRoute
            path="/kon-la-tieng"
            component={AuthRouter}
            isAuth={isLoggedIn}
            userData={currentUser}
            userPic={currentPic}
          />
          <Route path="*">
            <Redirect to="/kon-la-tieng" />
          </Route>
        </Switch>
      ) : role === "HOSPITAL" ? (
        <div>
          <button className="btn btn-wide btn-primary">Hospital</button>
        </div>
      ) : (
        <div>SuperAdmin</div>
      )}
    </div>
  );
}

export default App;
