import { Route, Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui-slice";
const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
    
  const dispatch = useDispatch();

  if (!isAuth) {
    dispatch(
      uiActions.setNoti({
        status: "error",
        title: "กรุณาเข้าสู่ระบบ",
      })
    );
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
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
