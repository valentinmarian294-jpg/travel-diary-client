import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />

      <span className="login-text">LOG IN</span>

      <button
        type="button"
        className="menu-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <ul className="menu">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li>
             <Link to="/AddTravel" onClick={() => setIsOpen(false)}>
              Add Trips
             </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;