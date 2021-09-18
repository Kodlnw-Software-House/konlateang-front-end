import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Modal from "../ui/Modal";
import NavBarMenu from "./NavbarMenu";
import default_profile from "../../assets/default_profile.png";

const Navbar = (props) => {
  const [showMenu, setMenu] = useState(false);


  const { path } = useRouteMatch();

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <header className="navbar justify-between shadow-lg bg-primary text-neutral-content">
      {showMenu && (
        <Modal type="DECISION" closeModal={toggleMenu}>
          <NavBarMenu toggleMenu={toggleMenu} />
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
          <p>สวัสดี, {props.userData?.fname}</p>
          <p>{props.userData?.email}</p>
        </div>
        <Link to={`${path}/my-profile`} className="avatar cursor-pointer">
          <div className="rounded-full w-14 h-14 m-1 ">
            <img
              src={
                props.userData
                  ? `${process.env.REACT_APP_BACKEND_MAIN_URL}patient/avatar/${props.userData.patient_id}`
                  : default_profile
              }
              alt="profile_pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = default_profile;
              }}
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
