import React from "react";

function Awards() {
  return (
    <div className="container-fluid px-4 px-lg-5 mt-5">
      {/* Section Header */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h2 className="text-muted fw-light fs-2 fs-lg-1 mb-0">Awards & Recognition</h2>
        </div>
      </div>

      {/* Main Awards Row - Responsive Grid */}
      <div className="row g-4 g-lg-5 align-items-center">
        {/* Image Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6 text-center">
          <div className="p-3 p-lg-0">
            <img 
              src="/media/images/largestBroker.svg" 
              alt="Largest Stock Broker in India" 
              className="img-fluid" 
              style={{ 
                width: "clamp(200px, 60vw, 400px)", 
                maxHeight: "300px",
                objectFit: "contain"
              }} 
            />
          </div>
        </div>

        {/* Content Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6">
          <div className="p-4 p-lg-5">
            {/* Main Title */}
            <h1 className="display-5 fs-1 fs-md-2 text-dark fw-bold mb-4">
              Largest stock broker in India
            </h1>
            
            {/* Description */}
            <p className="text-muted lh-lg mb-5 fs-6" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
              <strong>1.5+ Crore Bullzaar clients</strong> contribute to over <strong>15% of all retail order volumes</strong> 
              in India daily by trading and investing in:
            </p>

            {/* 2-Column List - Responsive */}
            <div className="row g-3 mb-5">
              <div className="col-6">
                <ul className="list-unstyled ps-3">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Futures and Options</strong>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Commodity derivatives</strong>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Currency derivatives</strong>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled ps-3">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Stocks & IPOs</strong>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Direct mutual funds</strong>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Bonds and Govt. Securities</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Press Logos */}
            <div className="text-center">
              <img 
                src="/media/images/pressLogos.png" 
                alt="Press Logos" 
                className="img-fluid" 
                style={{ width: "clamp(200px, 90vw, 90%)" }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;