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
      <Dropdown />
    </nav>
  );
};

export default sideDrawer;
