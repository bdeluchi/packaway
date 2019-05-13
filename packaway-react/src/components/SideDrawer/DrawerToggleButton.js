import React from "react";

import "./DrawerToggleButton.scss"

const drawerToggleButton = props => {
  return (
    <button className="toggle-button">
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
    </button>
  );
};

export default drawerToggleButton;
