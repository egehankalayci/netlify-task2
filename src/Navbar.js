import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function Navbar() {
    return (

        <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Character List</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/episode" className="nav-link">Episode List</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/location" className="nav-link">Location List</Link>
                </li>
            </ul>

        </nav>
    
    )
}

// gönderilen propların veri tipini belirleyebiliriz veya gerekli olup olmadığını ayarlayabiliriz
Navbar.propTypes={
    title: PropTypes.string.isRequired
}
Navbar.defaultProps ={
    title: "Default App"
}
export default Navbar;
