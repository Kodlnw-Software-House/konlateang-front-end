import { Route, Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui-slice";
import { AuthAction } from "../../redux/auth-slice";
const ProtectedRoute = ({
  isAuth,
  component: Component,
  userData,
  userPic,
  role,
  ...rest
}) => {
  const dispatch = useDispatch();

  if (!isAuth) {
    dispatch(
      uiActions.setNoti({
        status: "error",
        title: "กรุณาเข้าสู่ระบบ",
      })
    );
    dispatch(AuthAction.userLogedOut());
    dispatch(uiActions.toggleTheme({ theme: "patientTheme" }));
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return (
            <Component
              isAuth={isAuth}
              userData={userData}
              userPic={userPic}
              role={role}
            />
          );
        } else {
          return (
            <Redirect to={{ pathName: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
