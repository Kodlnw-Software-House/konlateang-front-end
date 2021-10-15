import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../redux/auth-slice";
import { uiActions } from "../../redux/ui-slice";
import userService from "../functions/services/user-service";
import HospitalService from "../functions/services/hospital-service";
import Modal from "../ui/Modal";
import NavBarMenu from "./NavbarMenu";
import default_profile from "../../assets/default_profile.png";

const Navbar = (props) => {
  const distpatch = useDispatch();
  const [showMenu, setMenu] = useState(false);
  const { path } = useRouteMatch();

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  const logoutHandler = () => {
    toggleMenu();
    let token = localStorage.getItem("user");
    if (props.role === "PATIENT") {
      userService
        .user_logout(token)
        .then(() => {
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          distpatch(AuthAction.userLogedOut());
        })
        .catch((e) => {
          console.console.log(e.message);
        });
    }

    if (props.role === "HOSPITAL") {
      HospitalService.logout(token)
        .then(() => {
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          distpatch(AuthAction.userLogedOut());
        })
        .catch((e) => {
          console.console.log(e.message);
        });
    }
  };

  return (
    <header className="navbar justify-between shadow-lg bg-primary text-neutral-content sticky top-0 z-50">
      {showMenu && (
        <Modal type="DECISION" closeModal={toggleMenu}>
          <NavBarMenu
            role={props.role}
            toggleMenu={toggleMenu}
            logoutHandler={logoutHandler}
          />
        </Modal>
      )}

      <div className="flex">
        <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
          <MenuIcon />
        </button>
      </div>

      <div className="hidden px-2 mx-2 md:flex md:flex-1">
        <span className="text-2xl font-bold">คนละเตียง</span>
      </div>

      <div className="space-x-1">
        <div className="text-right leading-5">
          <Link to={`${path}`} className="text-lg">
            สวัสดี,{" "}
            {props.role === "PATIENT"
              ? props.userData?.fname
              : props.role === "HOSPITAL"
              ? props.userData?.hospital_name
              : "ยินดีต้อนรับ"}
          </Link>
          {/* <p>{props.userData?.email}</p> */}
        </div>
        {props.role === "PATIENT" && (
          <Link to={`${path}/my-profile`} className="avatar cursor-pointer">
            <div className="rounded-full w-14 h-14 m-1 ">
              <img
                src={props.userPic ? props.userPic : default_profile}
                alt="profile_pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = default_profile;
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
