import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
      <div className="container p-2">
        {/* Logo/Brand - Responsive */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/media/images/logo.jpg" 
            alt="Bullzaar Logo" 
            className="img-fluid" 
            style={{ width: "40px", height: "40px" }} // Fixed size for mobile
          /> 
          <span 
            className="ms-2 fw-bold" 
            style={{ fontFamily: "serif" }}
          >
            Bullzaar
          </span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navigation Menu */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Main Navigation Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>
          </ul>

          {/* Register Button - Right Aligned & Responsive */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className="nav-link btn btn-outline-primary px-3" 
                to="http://localhost:3001/login"
                style={{ 
                  borderRadius: "25px",
                  fontWeight: "500"
                }}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;