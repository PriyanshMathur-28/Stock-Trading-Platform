import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="container-fluid px-4 px-lg-5">
      {/* Section Title - Responsive */}
      <div className="row justify-content-center p-3 p-md-5 mt-5 mb-4">
        <div className="col-12">
          <h1 className="text-center text-muted fw-light fs-1 fs-md-2">
            People
          </h1>
        </div>
      </div>

      {/* Team Card - Responsive Grid */}
      <div className="row g-4 g-lg-5 justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row g-4">
            {/* Image Column - Stacks on Mobile */}
            <div className="col-12 col-lg-5 text-center">
              <div className="p-4 p-lg-0">
                <img 
                  src="/media/images/nithinKamath.jpg" 
                  alt="Priyansh Mathur" 
                  className="rounded-circle img-fluid shadow" 
                  style={{ 
                    width: "clamp(150px, 40vw, 250px)", 
                    height: "clamp(150px, 40vw, 250px)",
                    objectFit: "cover"
                  }} 
                />
                <h4 className="mt-4 mb-2 text-dark fs-3 fs-lg-2">Priyansh Mathur</h4>
                <h6 className="text-muted mb-0 fs-6">Founder, CEO</h6>
              </div>
            </div>

            {/* Bio Column - Stacks on Mobile */}
            <div className="col-12 col-lg-7">
              <div className="p-4 p-lg-5 text-muted lh-lg" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
                <p className="mb-4">
                  Priyansh Mathur bootstrapped and founded <strong>Bullzaar in 2020</strong> to overcome the hurdles he faced during his decade-long stint as a trader. Today, Bullzaar has <strong>changed the landscape</strong> of the Indian broking industry.
                </p>
                
                <p className="mb-4">
                  He is a member of the <strong>SEBI Secondary Market Advisory Committee (SMAC)</strong> and the <strong>Market Data Advisory Committee (MDAC)</strong>.
                </p>
                
                <p className="mb-4">
                  <em>Playing basketball is his zen.</em>
                </p>
                
                <p className="mb-0">
                  Connect on{" "}
                  <Link 
                    to="/" 
                    className="text-decoration-none fw-bold"
                    style={{ color: "#387ed1" }}
                  >
                    Homepage
                  </Link>{" "}
                  /{" "}
                  <a 
                    href="https://tradingqna.com/u/nithin/summary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#387ed1" }}
                  >
                    TradingQnA
                  </a>{" "}
                  /{" "}
                  <a 
                    href="https://twitter.com/Nithin0dha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#387ed1" }}
                  >
                    Twitter
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;