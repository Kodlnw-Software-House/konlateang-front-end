import { AuthAction } from "../../../redux/auth-slice";
import { useDispatch } from "react-redux";
import AdminService from "../../../components/functions/services/admin-service";
import { uiActions } from "../../../redux/ui-slice";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import PatientTable from "./PatientTable";
import IsolationTable from "./IsolationTable";
import NotFound from "../not-found";
import ItemCard from "../../../components/ui/ItemCard";
import { LogoutIcon } from "@heroicons/react/outline";
const AdminMainPage = () => {
  const dispatch = useDispatch();
  let { path } = useRouteMatch();
  console.log(path);
  const logout = () => {
    AdminService.logout(localStorage.getItem("user"))
      .then(() => {
        dispatch(uiActions.toggleTheme({ theme: "patientTheme" }));
        dispatch(AuthAction.userLogedOut());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-row h-screen w-screen">
      {/* menu */}
      <div className="w-1/6 bg-primary">
        <div className="btn-group flex-col w-full">
          <NavLink
            to={path + "/patients"}
            className="btn btn-lg btn-primary btn-block rounded-none border-b-4 border-t-0 border-r-0 border-l-0 hover:border-gray-300"
            activeClassName="btn btn-lg btn-primary btn-block border-primary-content border-b-4 border-t-0 border-r-0 border-l-0 rounded-none hover:border-primary-content"
          >
            ผู้ป่วยทั้งหมด
          </NavLink>
          <NavLink
            to={path + "/isolations"}
            className="btn btn-lg btn-primary btn-block rounded-none border-b-4 border-t-0 border-r-0 border-l-0 hover:border-gray-300"
            activeClassName="btn btn-lg btn-primary btn-block border-primary-content border-b-4 border-t-0 border-r-0 border-l-0 rounded-none hover:border-primary-content"
          >
            ศูนย์พักคอยทั้งหมด
          </NavLink>
          <button
            onClick={logout}
            className="btn btn-lg btn-primary btn-block rounded-none border-b-4 border-t-0 border-r-0 border-l-0"
          >
            ออกจากระบบ <LogoutIcon className="w-9 px-1" />
          </button>
        </div>
      </div>
      {/* content */}
      <div className="w-full bg-gray-300">
        <Switch>
          <Route path={path} exact>
            <div className="flex flex-col justify-center items-center h-full w-full text-center">
              <ItemCard>
                <div className="p-24">
                  <h1 className="text-4xl font-bold">
                    ยินดีต้อนรับ Admin คนละเตียง
                  </h1>
                  <h1 className="font-bold">.</h1>
                  <h1 className="text-3xl">
                    ขอบคุณที่คอยช่วยเหลือเว็บไซต์เราตลอดมา
                  </h1>
                  <h1 className="text-5xl pt-8">✨🔥</h1>
                </div>
              </ItemCard>
            </div>
          </Route>
          <Route path={path + "/isolations"}>
            <IsolationTable />
          </Route>
          <Route path={path + "/patients"}>
            <PatientTable />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AdminMainPage;
