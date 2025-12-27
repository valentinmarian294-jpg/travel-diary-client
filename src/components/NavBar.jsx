import { useState } from "react";
import logo from "../assets/logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />

      <h1 className="navbar-title">Travel Diary</h1>

      <button
        className="menu-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <ul className="menu">
          <li>Home</li>
          <li>Login</li>
          <li>Travels</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;