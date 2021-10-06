import { Fragment, useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/ui/Footer";
import ProtectedRoute from "../../components/functions/ProtectedRoute";
import NotFound from "./not-found";
import HospitalInfo from "./HospitalInformation";
import Profile from "./Profile";
import AboutUs from "./AboutUs";
import MainPage from "./MainPage/MainPage";
import { Route, Redirect, useRouteMatch } from "react-router";
const AuthRouter = (props) => {
  const [userData, setUserData] = useState(props.userData);
  const [userPic, setUserPic] = useState(props.userPic);
  let { path } = useRouteMatch();
  console.log(userData);
  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  useEffect(() => {
    setUserPic(props.userPic);
  }, [props.userPic]);

  return (
    <Fragment>
      <Navbar userData={userData} userPic={userPic} />
      <div className="bg-blue-50 min-h-screen flow-root">
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
      </div>
      <Footer />
    </Fragment>
  );
};

export default AuthRouter;
