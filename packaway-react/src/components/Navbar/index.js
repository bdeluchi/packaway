import React from 'react';
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown';

import './index.scss';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="nav-home nav-left"><Link to="/">Packaway</Link></li>
        <li className="nav-myaccount nav-right"><Dropdown /></li> 
        <li className="nav-mypack nav-right">My pack</li>
      </ul>
    </nav>
  );
};

export default Navbar;