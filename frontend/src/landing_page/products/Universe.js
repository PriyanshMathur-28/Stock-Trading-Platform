import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Section Header - Responsive */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8 text-center">
          <h1 className="display-4 fs-1 fs-md-2 fw-bold text-dark mb-3 lh-lg">
            The Bullzaar Universe
          </h1>
          <p className="text-muted fs-4 fs-md-5 lh-lg mb-0" style={{ fontSize: "clamp(1em, 2.5vw, 1.2em)" }}>
            Extend your trading and investment experience even further with our partner platforms
          </p>
        </div>
      </div>

      {/* Partner Logos Grid - Responsive */}
      <div className="row g-4 g-lg-5 justify-content-center mb-5">
        {/* Smallcase */}
        <div className="col-12 col-md-6 col-lg-4 text-center">
          <div className="card border-0 bg-white shadow-sm h-100 rounded-4 p-4">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="mb-3">
                <img 
                  src="/media/images/smallcaselogo.png" 
                  alt="Smallcase - Thematic Investment Platform" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(80px, 20vw, 120px)", 
                    height: "clamp(80px, 20vw, 120px)",
                    objectFit: "contain"
                  }} 
                />
              </div>
              <h5 className="card-title fw-bold text-dark mb-2 fs-5">Smallcase</h5>
              <p className="text-muted mb-0 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 0.95em)" }}>
                Thematic investment platform
              </p>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="col-12 col-md-6 col-lg-4 text-center">
          <div className="card border-0 bg-white shadow-sm h-100 rounded-4 p-4">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="mb-3">
                <img 
                  src="/media/images/streakLogo.png" 
                  alt="Streak - Algo & Strategy Platform" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(80px, 20vw, 120px)", 
                    height: "clamp(80px, 20vw, 120px)",
                    objectFit: "contain"
                  }} 
                />
              </div>
              <h5 className="card-title fw-bold text-dark mb-2 fs-5">Streak</h5>
              <p className="text-muted mb-0 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 0.95em)" }}>
                Algo & strategy platform
              </p>
            </div>
          </div>
        </div>

        {/* Sensibull */}
        <div className="col-12 col-md-6 col-lg-4 text-center">
          <div className="card border-0 bg-white shadow-sm h-100 rounded-4 p-4">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="mb-3">
                <img 
                  src="/media/images/sensibullLogo.svg" 
                  alt="Sensibull - Options Trading Platform" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(80px, 20vw, 120px)", 
                    height: "clamp(80px, 20vw, 120px)",
                    objectFit: "contain"
                  }} 
                />
              </div>
              <h5 className="card-title fw-bold text-dark mb-2 fs-5">Sensibull</h5>
              <p className="text-muted mb-0 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 0.95em)" }}>
                Options trading platform
              </p>
            </div>
          </div>
        </div>

        {/* Bullzaar Fundhouse */}
        <div className="col-12 col-md-6 col-lg-4 text-center">
          <div className="card border-0 bg-white shadow-sm h-100 rounded-4 p-4">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="mb-3">
                <img 
                  src="/media/images/BullzaarFundhouse.png" 
                  alt="Bullzaar Fundhouse - Asset Management" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(80px, 20vw, 120px)", 
                    height: "clamp(80px, 20vw, 120px)",
                    objectFit: "contain"
                  }} 
                />
              </div>
              <h5 className="card-title fw-bold text-dark mb-2 fs-5">Bullzaar Fundhouse</h5>
              <p className="text-muted mb-0 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 0.95em)" }}>
                Asset management
              </p>
            </div>
          </div>
        </div>

        {/* Tijori */}
        <div className="col-12 col-md-6 col-lg-4 text-center">
          <div className="card border-0 bg-white shadow-sm h-100 rounded-4 p-4">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="mb-3">
                <img 
                  src="/media/images/tijori.svg" 
                  alt="Tijori - Fundamental Research Platform" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(80px, 20vw, 120px)", 
                    height: "clamp(80px, 20vw, 120px)",
                    objectFit: "contain"
                  }} 
                />
              </div>
              <h5 className="card-title fw-bold text-dark mb-2 fs-5">Tijori</h5>
              <p className="text-muted mb-0 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 0.95em)" }}>
                Fundamental research platform
              </p>
            </div>
          </div>
        </div>

        {/* Ditto */}
        <div className="col-12 col-md-6 col-lg-4 text-center">
          <div className="card border-0 bg-white shadow-sm h-100 rounded-4 p-4">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="mb-3">
                <img 
                  src="/media/images/dittoLogo.png" 
                  alt="Ditto - Insurance" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(80px, 20vw, 120px)", 
                    height: "clamp(80px, 20vw, 120px)",
                    objectFit: "contain"
                  }} 
                />
              </div>
              <h5 className="card-title fw-bold text-dark mb-2 fs-5">Ditto</h5>
              <p className="text-muted mb-0 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 0.95em)" }}>
                Insurance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button - Responsive */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <Link to="https://stock-trading-platform-three.vercel.app/">
            <button 
              className="btn btn-primary btn-lg w-100 py-4 rounded-pill fs-5 shadow-lg"
              style={{ fontWeight: "600" }}
            >
              <i className="fas fa-user-plus me-2"></i>
              Sign up now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;