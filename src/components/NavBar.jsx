import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar({user, setUser}) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="navbar-logo" />
      </Link>

      <h1
  className="login-text"
  onClick={user ? handleLogout : null}
>
  {user ? (
    "LOG OUT"
  ) : (
    <Link to="/LoginTrips">LOG IN</Link>
  )}
</h1>

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

  {user && (
    <li>
      <Link to="/AddTravel" onClick={() => setIsOpen(false)}>
        Add Trips
      </Link>
    </li>
  )}
</ul>
      )}
    </nav>
  );
}

export default NavBar;