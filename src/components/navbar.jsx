import React from 'react';
import '../sass/homestyle.css'; // Importa los estilos CSS
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { BiBookmark } from "react-icons/bi";
import { CiUser } from "react-icons/ci";

function Navbar() {
  return (
    <>
      <div className="div-mobile-navbar">
        <nav className="mobile-navbar">
          <ul>
            <li className="nav-item"><GoHome /></li>
            <li className="nav-item"><CiSearch /></li>
            <li className="nav-item"><BiBookmark /></li>
            <li className="nav-item"><CiUser /></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
