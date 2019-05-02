import React from 'react';
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown';

const Navbar = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Packaway</Link></li>
        <li><Dropdown /></li> 
        <li>My pack</li>
      </ul>
    </div>
  );
};

export default Navbar;