import React, { useState } from "react";
import { Toolbar, AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import { Menu } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { StyledMenuItem } from "./StyledMenuItem";

const Navbar = () => {
  const [anchorElement, setAnchorElement] = useState(null);

  const handleMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <AppBar elevation={0} color="primary" position="fixed" className="h-18">
      <Toolbar className="h-20 flex justify-between">
        <IconButton
          edge="start"
          color="inherit"
          size="medium"
          aria-label="menu"
        >
          <MenuIcon fontSize="large" onClick={handleMenu} />
          <Menu
            id="menu"
            anchorEl={anchorElement}
            keepMounted
            open={Boolean(anchorElement)}
            onClose={handleClose}
            color="primary"
            TransitionComponent={Fade}
            MenuListProps={{ disablePadding: true }}
          >
            <StyledMenuItem onClick={handleClose}>หน้าแรก</StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>ข้อมูลส่วนตัว</StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>เกี่ยวกับเรา</StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>ออกจากระบบ</StyledMenuItem>
          </Menu>
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
