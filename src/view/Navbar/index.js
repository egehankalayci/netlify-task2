import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

function Navbar () {
  return (
    <>
      <ul className="navbar">
        <li className="navbar__item">
          <Link to="/">Character List</Link>
        </li>
        <li className="navbar__item">
          <Link to="/episode">Episode List</Link>
        </li>
        <li className="navbar__item">
          <Link to="/location">Location List</Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
