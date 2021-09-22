import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../redux/auth-slice";
import userService from "../functions/services/user-service";
const NavBarMenu = (props) => {
  const distpatch = useDispatch();
  const { path, url } = useRouteMatch();

  const logoutHandler = () => {
    props.toggleMenu();
    let token = localStorage.getItem("user");
    userService
      .user_logout(token)
      .then(() => {
        distpatch(AuthAction.userLogedOut());
      })
      .catch((e) => {
        console.log(e.response.data.error);
      });
  };

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
};
export default NavBarMenu;
