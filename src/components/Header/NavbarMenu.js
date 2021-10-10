import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../redux/auth-slice";
import { uiActions } from "../../redux/ui-slice";
import userService from "../functions/services/user-service";
import HospitalService from "../functions/services/hospital-service";
const NavBarMenu = (props) => {
  const distpatch = useDispatch();
  const { path, url } = useRouteMatch();

  const logoutHandler = () => {
    props.toggleMenu();

    let token = localStorage.getItem("user");

    if (props.role === "PATIENT") {
      userService
        .user_logout(token)
        .then(() => {
          distpatch(AuthAction.userLogedOut());
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
        })
        .catch((e) => {
          console.console.log(e.message);
        });
    }

    if (props.role === "HOSPITAL") {
      HospitalService.logout(token)
        .then(() => {
          distpatch(AuthAction.userLogedOut());
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
        })
        .catch((e) => {
          console.console.log(e.message);
        });
    }
  };

  if (props.role === "PATIENT") {
    return (
      <div className="flex flex-col justify-center text-center space-y-2">
        <Link
          to={path}
          className="border-b-2 border-base-300"
          onClick={props.toggleMenu}
        >
          <span className="text-2xl leading-relaxed">หน้าแรก</span>
        </Link>
        <Link
          to={`${url}/my-profile`}
          className="border-b-2 border-base-300"
          onClick={props.toggleMenu}
        >
          <span className="text-2xl leading-relaxed">ข้อมูลส่วนตัว</span>
        </Link>
        <Link
          to={`${url}/about-us`}
          className="border-b-2 border-base-300"
          onClick={props.toggleMenu}
        >
          <span className="text-2xl leading-relaxed">เกี่ยวกับเรา</span>
        </Link>
        <div className="cursor-pointer" onClick={logoutHandler}>
          <span className="text-2xl leading-relaxed">ออกจากระบบ</span>
        </div>
      </div>
    );
  }

  if (props.role === "HOSPITAL") {
    return (
      <div className="flex flex-col justify-center text-center space-y-2">
        <Link
          to={path}
          className="border-b-2 border-base-300"
          onClick={props.toggleMenu}
        >
          <span className="text-2xl leading-relaxed">หน้าแรก</span>
        </Link>
        <Link
          to={`${url}/about-us`}
          className="border-b-2 border-base-300"
          onClick={props.toggleMenu}
        >
          <span className="text-2xl leading-relaxed">เกี่ยวกับเรา</span>
        </Link>
        <div className="cursor-pointer" onClick={logoutHandler}>
          <span className="text-2xl leading-relaxed">ออกจากระบบ</span>
        </div>
      </div>
    );
  }

  if (props.role === "ADMIN") {
    return (
      <div className="flex flex-col justify-center text-center space-y-2">
        <Link
          to={path}
          className="border-b-2 border-base-300"
          onClick={props.toggleMenu}
        >
          <span className="text-2xl leading-relaxed">หน้าแรก</span>
        </Link>
        <div className="cursor-pointer" onClick={logoutHandler}>
          <span className="text-2xl leading-relaxed">ออกจากระบบ</span>
        </div>
      </div>
    );
  }
};
export default NavBarMenu;
