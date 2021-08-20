import React from "react";
import { Toolbar, AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";

const Navbar = () => {
  return (
      <AppBar elevation={0} color="primary" position="fixed" className="h-18">
        <Toolbar className="h-20 flex justify-between">
          <IconButton
            edge="start"
            color="inherit"
            size="medium"
            aria-label="menu"
            className=""
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <div className="flex justify-items-end">
            <div className="text-right mr-1 my-auto">
              <p className="font-bold text-lg">Welcome JJ</p>
              <p className="font-normal">HelloWorld@example.com</p>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              size="medium"
              aria-label="profile"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
