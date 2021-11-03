import { Fragment, useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/ui/Footer";
import ProtectedRoute from "../../components/functions/ProtectedRoute";
import NotFound from "./not-found";
import HospitalInfo from "./Patient/HospitalInformation";
import Profile from "./Patient/Profile";
import AboutUs from "./AboutUs";
import MainPage from "./Patient/MainPage";
import HospitalAdminMainPage from "./HospitalAdmininstrator/HospitalAdminMainPage";
import IsolationMainPage from "./HospitalAdmininstrator/IsolationMainPage";
import CreateEditIsolation from "./HospitalAdmininstrator/CreateNewIsolation";
import { Route, Redirect, useRouteMatch } from "react-router";

const AuthRouter = (props) => {
  const [userData, setUserData] = useState(props.userData);
  const [userPic, setUserPic] = useState(props.userPic);
  const [role, setRole] = useState(props.role);
  let { path } = useRouteMatch();

  useEffect(() => {
    setRole(props.role);
  }, [props.role]);

  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  useEffect(() => {
    setUserPic(props.userPic);
  }, [props.userPic]);

  return (
    <Fragment>
      <Navbar userData={userData} userPic={userPic} role={role} />
      <div className="bg-blue-50 min-h-screen flow-root">
        {role === "PATIENT" ? (
          <Switch>
            <ProtectedRoute
              path={path}
              component={MainPage}
              isAuth={props.isAuth}
              exact
            />
            <ProtectedRoute
              path={`${path}/my-profile`}
              component={Profile}
              isAuth={props.isAuth}
              exact
              userData={userData}
              userPic={userPic}
            />
            <ProtectedRoute
              path={`${path}/about-us`}
              component={AboutUs}
              isAuth={props.isAuth}
              exact
            />
            <ProtectedRoute
              path={`${path}/community-isolation/id/:id`}
              component={HospitalInfo}
              isAuth={props.isAuth}
              exact
            />
            <ProtectedRoute
              path={`${path}/not-found`}
              component={NotFound}
              isAuth={props.isAuth}
              exact
            />
            <Route path="*">
              <Redirect to={`${path}/not-found`} />
            </Route>
          </Switch>
        ) : role === "HOSPITAL" ? (
          <Switch>
            <ProtectedRoute
              path={path}
              component={HospitalAdminMainPage}
              isAuth={props.isAuth}
              exact
            />
            <ProtectedRoute
              path={`${path}/community-isolation/id/:id`}
              component={IsolationMainPage}
              isAuth={props.isAuth}
            />
            <ProtectedRoute
              path={`${path}/community-isolation/create`}
              component={CreateEditIsolation}
              isAuth={props.isAuth}
              exact
            />
            <ProtectedRoute
              path={`${path}/about-us`}
              component={AboutUs}
              isAuth={props.isAuth}
              exact
            />
            <ProtectedRoute
              path={`${path}/not-found`}
              component={NotFound}
              isAuth={props.isAuth}
              exact
            />
            <Route path="*">
              <Redirect to={`${path}`} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <ProtectedRoute
              path={`${path}/not-found`}
              component={NotFound}
              isAuth={props.isAuth}
              exact
            />
            <Route path="*">
              <Redirect to={`${path}/not-found`} />
            </Route>
          </Switch>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default AuthRouter;
