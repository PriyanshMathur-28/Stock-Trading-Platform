import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container-fluid px-4 px-lg-5 p-3 p-md-5 mb-5">
      <div className="row justify-content-center text-center align-items-center g-4 g-lg-0">
        {/* Hero Image - Responsive */}
        <div className="col-12 col-lg-6">
          <div className="p-3">
            <img 
              src="/media/images/homeHero.png" 
              alt="Invest in everything - Stocks, Derivatives, Mutual Funds" 
              className="img-fluid rounded shadow-lg" 
              style={{ 
                width: "100%", 
                maxHeight: "clamp(250px, 50vh, 500px)",
                objectFit: "contain"
              }} 
            />
          </div>
        </div>

        {/* Content - Responsive */}
        <div className="col-12 col-lg-6">
          <div className="p-4 p-lg-0">
            {/* Main Title */}
            <h1 className="display-3 fs-1 fs-md-2 fw-bold text-dark mb-4 lh-lg">
              Invest in <span className="text-primary">everything</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-muted fs-5 fs-md-4 mb-5 lh-lg" style={{ fontSize: "clamp(1.1em, 3vw, 1.25em)" }}>
              Online platform to invest in stocks, derivatives, mutual funds, and <strong>more</strong>
            </p>
            
            {/* CTA Button */}
            <Link to="http://localhost:3001/login">
              <button 
                className="btn btn-primary btn-lg px-5 py-3 fs-5 shadow-lg"
                style={{ 
                  width: "clamp(200px, 50%, 280px)", 
                  borderRadius: "50px",
                  fontWeight: "600"
                }}
              >
                <i className="fas fa-user-plus me-2"></i>
                Sign up now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;