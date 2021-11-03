import {
  MenuIcon,
  LogoutIcon,
  HomeIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
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
    <header className="navbar justify-between shadow-lg bg-primary text-neutral-content sticky top-0 z-50 py-4 px-4 md:h-10 lg:h-14">
      {showMenu && (
        <Modal type="DECISION" closeModal={toggleMenu}>
          <NavBarMenu
            role={props.role}
            toggleMenu={toggleMenu}
            logoutHandler={logoutHandler}
          />
        </Modal>
      )}
      <div>
        <Link to={path} className="text-2xl font-bold">
          คนละเตียง
        </Link>
      </div>

      <div className="hidden sm:flex sm:items-center">
        <div className="text-xl space-x-10 lg:space-x-20 flex flex-row">
          {props.role === "PATIENT" ? (
            <Fragment>
              <NavLink
                exact
                to={path}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <HomeIcon className="w-10 py-1" />
              </NavLink>
              <NavLink
                exact
                to={`${path}/my-profile`}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <IdentificationIcon className="w-10 py-1" />
              </NavLink>
              <NavLink
                exact
                to={`${path}/about-us`}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <QuestionMarkCircleIcon className="w-10 py-1" />
              </NavLink>
            </Fragment>
          ) : props.role === "HOSPITAL" ? (
            <Fragment>
              <NavLink
                exact
                to={path}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <HomeIcon className="w-10 py-1" />
              </NavLink>
              <NavLink
                exact
                to={`${path}/about-us`}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <QuestionMarkCircleIcon className="w-10 py-1" />
              </NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink
                exact
                to={path}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <HomeIcon className="w-10 py-1" />
              </NavLink>
              <NavLink
                exact
                to={path + "/about-us"}
                className="text-primary-content hover:text-gray-400 "
                activeClassName="border-b-4 border-primary-content text-primary-content"
              >
                <QuestionMarkCircleIcon className="w-10 py-1" />
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center">
        <Link
          to={props.role === "PATIENT" ? `${path}/my-profile` : path}
          className="text-lg font-semibold px-1"
        >
          สวัสดี,{" "}
          {props.role === "PATIENT"
            ? props.userData?.fname
            : props.role === "HOSPITAL"
            ? props.userData?.hospital_name
            : "ยินดีต้อนรับ"}
        </Link>
        {props.role === "PATIENT" && (
          <Link
            to={`${path}/my-profile`}
            className="avatar cursor-pointer hidden lg:block"
          >
            <div className=" rounded-full w-14 h-14 m-1 ">
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
        <div className="hidden md:flex invisible md:visible">
          <button
            className="w-7 font-thin text-primary-content  hover:text-primary-focus"
            onClick={logoutHandler}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      <div className="sm:hidden cursor-pointer">
        <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
