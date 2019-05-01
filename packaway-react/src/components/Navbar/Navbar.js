import React from 'react';
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown';

const Navbar = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Packaway</Link></li>
        {/* should have login/register when anon and when logged in change to: My packs, Profile, Logout */}
        <li><Dropdown /></li> 
        <li>My pack</li>
      </ul>
    </div>
  );
};

export default Navbar;