import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light border-bottom mb-5">
      <div className="row justify-content-center text-center g-4 g-lg-0">
        {/* Left Content - Responsive */}
        <div className="col-12 col-lg-6">
          <div className="p-4 p-lg-0">
            {/* Main Title */}
            <h1 className="display-3 fs-1 fs-md-2 fw-bold text-dark mb-4 lh-lg">
              Technology
            </h1>
            
            {/* Subtitle */}
            <h3 className="text-muted fs-1 fs-md-2 mb-4 lh-lg" style={{ fontSize: "clamp(1.3em, 4vw, 2em)" }}>
              <strong>Sleek, modern, and intuitive</strong><br />
              <span className="text-primary">trading platforms</span>
            </h3>
            
            {/* CTA Link */}
            <div className="d-inline-flex align-items-center justify-content-center">
              <Link 
                to="/investments"
                className="btn btn-primary btn-lg px-5 py-3 fs-5 shadow-lg text-decoration-none"
                style={{ 
                  borderRadius: "50px",
                  fontWeight: "600"
                }}
              >
                <i className="fas fa-chart-line me-2"></i>
                Check our investment offerings
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image - Responsive */}
        <div className="col-12 col-lg-6 text-center">
          <div className="p-4 p-lg-0">
            <div className="position-relative">
              <img 
                src="/images/technology-hero.png" 
                alt="Modern Trading Platforms" 
                className="img-fluid rounded-4 shadow-lg" 
                style={{ 
                  width: "100%", 
                  maxHeight: "clamp(300px, 60vh, 500px)",
                  objectFit: "contain"
                }} 
              />
              {/* Technology Badges */}
              <div className="position-absolute top-10 start-10 bg-primary text-white px-3 py-2 rounded-pill small fw-bold">
                Lightning Fast
              </div>
              <div className="position-absolute bottom-10 end-10 bg-success text-white px-3 py-2 rounded-pill small fw-bold">
                99.99% Uptime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights - Mobile Only */}
      <div className="row g-3 d-lg-none mt-4">
        <div className="col-4 text-center">
          <i className="fas fa-bolt text-primary fs-1 mb-2"></i>
          <p className="small fw-bold text-dark">Lightning<br/>Fast</p>
        </div>
        <div className="col-4 text-center">
          <i className="fas fa-shield-alt text-success fs-1 mb-2"></i>
          <p className="small fw-bold text-dark">99.99%<br/>Uptime</p>
        </div>
        <div className="col-4 text-center">
          <i className="fas fa-mobile-alt text-info fs-1 mb-2"></i>
          <p className="small fw-bold text-dark">Mobile<br/>Ready</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;