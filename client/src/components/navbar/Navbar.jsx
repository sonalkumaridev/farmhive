import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/farmhive-logo.png";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import Chatbot from "../chatbot/Chatbot";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showChat, setShowChat] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container-fluid">

        <Link
          className="navbar-brand d-flex align-items-center fw-bold fs-3 text-warning"
          to="/"
        >
          <img
            src={logo}
            alt="FarmHive Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          FarmHive
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

            <li className="nav-item">
              <Link to="/">
                <button className="btn nav-btn">Home</button>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/products">
                <button className="btn nav-btn">Products</button>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/cart">
                <button className="btn nav-btn">Cart</button>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about">
                <button className="btn nav-btn">About</button>
              </Link>
            </li>

            <li className="nav-item">
              <a href="/contact.html">
                <button className="btn nav-btn">Contact Us</button>
              </a>
            </li>

            {user && (
              <li className="nav-item">
                <Link to="/seller">
                  <button className="btn nav-btn text-warning border-warning">Seller Panel</button>
                </Link>
              </li>
            )}
            {/* Login / Profile */}
            <li className="nav-item">
              {user ? (
                <div className="dropdown ms-3">
                  <button
                    className="btn btn-warning rounded-circle fw-bold d-flex align-items-center justify-content-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark border border-warning">
                    <li>
                      <span className="dropdown-item-text text-warning">
                        Hello, {user.name}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider bg-warning" /></li>
                    <li>
                      <button
                        className="dropdown-item text-white hover-warning d-flex align-items-center gap-2"
                        onClick={toggleTheme}
                      >
                        <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </button>
                    </li>
                    <li>
                      <Link to="/seller" className="dropdown-item text-white hover-warning">
                        Seller Dashboard
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-white hover-warning" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn btn-warning ms-3 px-4 fw-semibold">
                    Login
                  </button>
                </Link>
              )}
            </li>

          </ul>
        </div>
      </div>

      {/* Floating Chatbot Trigger with Bee Logo */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="btn btn-warning rounded-circle shadow-lg d-flex align-items-center justify-content-center position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            zIndex: 1050,
            fontSize: "30px",
            border: "2px solid #fff"
          }}
        >
          🐝
        </button>
      )}

      {/* Render Chatbot */}
      <Chatbot isOpen={showChat} onClose={() => setShowChat(false)} />

      <style>{`
        .nav-btn {
          background: transparent;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          font-weight: 600;
        }

        .nav-btn:hover {
          color: #ffc107;
        }

        .dropdown-item.hover-warning:hover {
            background-color: transparent;
            color: #ffc107 !important;
        }

        .theme-toggle {
          background: transparent;
          border: 1px solid #ffc107;
          color: #ffc107;
        }

        .theme-toggle:hover {
          background: #ffc107;
          color: #000;
        }

        body[data-theme="light"] .navbar {
          background-color: #fff !important;
        }

        body[data-theme="light"] .nav-btn {
          color: #000;
        }

        body[data-theme="light"] .nav-btn:hover {
          color: #ffc107;
        }
      `}</style>
    </nav >
  );
}

export default Navbar;
