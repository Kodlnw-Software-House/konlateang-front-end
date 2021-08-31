import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import NavBarMenu from "./NavbarMenu";
const Navbar = () => {
  const [showMenu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <div className="navbar shadow-lg bg-primary text-neutral-content">
      {showMenu && (
        <Modal type="DECISION" closeModal={toggleMenu}>
          <NavBarMenu />
        </Modal>
      )}
      <div className="flex-1">
        <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
          <MenuIcon />
        </button>
      </div>
      <div className="flex-1 hidden px-2 mx-2 lg:flex">
        <span className="text-2xl font-bold">คนละเตียง</span>
      </div>
      <div className="space-x-1 lg:flex-none">
        <div className="text-right leading-5">
          <p>สวัสดี, ณัชนนท์</p>
          <p>helloword@example.com</p>
        </div>
        <Link to="/" className="avatar cursor-pointer">
          <div className="rounded-full w-14 h-14 m-1 ">
            <img src="https://i.pravatar.cc/500?img=32" alt="profile_pic" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
