import { Fragment } from "react";
import { Switch } from "react-router-dom";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/ui/Footer";
import ProtectedRoute from "../../components/functions/ProtectedRoute";
import NotFound from "./not-found";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import AboutUs from "./AboutUs";
import MainPage from "./MainPage/MainPage";
import { Route, Redirect, useRouteMatch } from "react-router";
const AuthRouter = () => {
  let { path } = useRouteMatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Fragment>
      <Navbar />
      <div className="bg-blue-50 min-h-screen flow-root">
        <Switch>
          <ProtectedRoute
            path={path}
            component={MainPage}
            isAuth={isLoggedIn}
            exact
          />
          <ProtectedRoute
            path={`${path}/my-profile`}
            component={Profile}
            isAuth={isLoggedIn}
            exact
          />
          <ProtectedRoute
            path={`${path}/about-us`}
            component={AboutUs}
            isAuth={isLoggedIn}
            exact
          />
          <ProtectedRoute
            path={`${path}/not-found`}
            component={NotFound}
            isAuth={isLoggedIn}
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
