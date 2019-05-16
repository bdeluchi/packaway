import React from "react";

import "./SideDrawer.scss";
import Dropdown from '../Dropdown';

const sideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <Dropdown closeMenu={props.closeMenu}  />
    </nav>
  );
};

export default sideDrawer;
