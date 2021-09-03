import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Modal from "../ui/Modal";
import NavBarMenu from "./NavbarMenu";
const Navbar = () => {
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
          <p>สวัสดี, ณัชนนท์</p>
          <p>helloword@example.com</p>
        </div>
        <Link to={`${path}/my-profile`} className="avatar cursor-pointer">
          <div className="rounded-full w-14 h-14 m-1 ">
            <img src="https://i.pravatar.cc/500?img=32" alt="profile_pic" />
          </div>
        </Link>
      </div>

    </header>
  );
};

export default Navbar;
