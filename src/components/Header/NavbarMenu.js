import { Link, useRouteMatch } from "react-router-dom";
const NavBarMenu = (props) => {
  const { path, url } = useRouteMatch();

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
        <div className="cursor-pointer" onClick={props.logoutHandler}>
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
        <div className="cursor-pointer" onClick={props.logoutHandler}>
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
        <div className="cursor-pointer" onClick={props.logoutHandler}>
          <span className="text-2xl leading-relaxed">ออกจากระบบ</span>
        </div>
      </div>
    );
  }
};
export default NavBarMenu;
