import {
  MenuIcon,
  LogoutIcon,
  HomeIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
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
import { motion } from "framer-motion";
import adminService from "../functions/services/admin-service";

const Navbar = (props) => {
  const distpatch = useDispatch();
  const [showMenu, setMenu] = useState(false);
  const [dropbar, setDropbar] = useState(false);
  const { path } = useRouteMatch();

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  
  const logoutHandler = () => {
    setDropbar((prev) => !prev);
    let token = localStorage.getItem("user");

    if (props.role === "PATIENT") {
      userService
        .user_logout(token)
        .then(() => {
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          distpatch(AuthAction.userLogedOut());
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

    if (props.role === "HOSPITAL") {
      HospitalService.logout(token)
        .then(() => {
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          distpatch(AuthAction.userLogedOut());
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

    if (props.role === "ADMIN") {
      adminService.logout(token)
        .then(() => {
          distpatch(uiActions.toggleTheme({ theme: "patientTheme" }));
          distpatch(AuthAction.userLogedOut());
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  const toggleDropbar = () => {
    setDropbar((prev) => !prev);
  };
  let dropbarClass = !dropbar
    ? "hidden"
    : "flex absolute right-2 top-16 py-2 w-56 text-lg bg-gray-50 rounded-md shadow-xl z-20 lg:right-6";
  const variants = {
    open: { opacity: 1, x: 20, y: -45 },
    closed: { opacity: 0, x: "-100%" },
  };
  return (
    <header className="navbar w-screen justify-between shadow-lg bg-primary text-neutral-content sticky top-0 z-50 py-4 px-4 md:h-10 lg:h-14">
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
            <null></null>
          )}
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center">
        <div className="flex flex-col justify-center">
          <button
            onClick={toggleDropbar}
            className="text-lg font-semibold px-1 flex flex-row items-stretch hover:text-gray-200"
          >
            สวัสดี,{" "}
            {props.role === "PATIENT"
              ? props.userData?.fname
              : props.role === "HOSPITAL"
              ? props.userData?.hospital_name
              : "Admin"}
            {dropbar ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )}
          </button>
          <motion.div animate={dropbar ? "open" : "closed"} variants={variants}>
            <div className={dropbarClass}>
              <div className="hidden md:flex md:flex-row mx-auto">
                <button
                  className="w-full font-thin text-primary-focus flex flex-row justify-center items-center hover:text-gray-500"
                  onClick={logoutHandler}
                >
                  <LogoutIcon className="w-8 px-1 block" />
                  <p>ออกจากระบบ</p>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {props.role === "PATIENT" && (
          <button
            onClick={toggleDropbar}
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
          </button>
        )}
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
