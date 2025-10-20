import React from "react";

function Education() {
  return (
    <div className="container-fluid px-4 px-lg-5 mt-5">
      {/* Section Header */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h2 className="text-muted fw-light fs-2 fs-lg-1 mb-0">Education</h2>
        </div>
      </div>

      {/* Main Education Row - Responsive Grid */}
      <div className="row g-4 g-lg-5 align-items-center">
        {/* Image Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6 text-center">
          <div className="p-3 p-lg-0">
            <img 
              src="/media/images/education.svg" 
              alt="Free Market Education" 
              className="img-fluid shadow-lg" 
              style={{ 
                width: "clamp(200px, 60vw, 400px)", 
                maxHeight: "350px",
                objectFit: "contain"
              }} 
            />
          </div>
        </div>

        {/* Content Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6">
          <div className="p-4 p-lg-5">
            {/* Main Title */}
            <h1 className="display-6 fs-2 fs-md-1 text-dark fw-bold mb-4">
              Free and open market education
            </h1>
            
            {/* Varsity Card */}
            <div className="card border-0 bg-light mb-4 p-4 rounded-3 shadow-sm">
              <div className="card-body p-0">
                <p className="text-muted lh-lg mb-3 fs-6" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
                  <strong>Varsity</strong>, the <strong>largest online stock market education book</strong> in the world 
                  covering everything from the basics to advanced trading.
                </p>
                <a 
                  href="https://zerodha.com/varsity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary px-4 py-2 text-decoration-none d-flex align-items-center"
                  style={{ borderRadius: "25px", fontWeight: "500" }}
                >
                  Explore Varsity 
                  <i className="fas fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>

            {/* TradingQ&A Card */}
            <div className="card border-0 bg-light p-4 rounded-3 shadow-sm">
              <div className="card-body p-0">
                <p className="text-muted lh-lg mb-3 fs-6" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
                  <strong>TradingQ&A</strong>, the <strong>most active trading and investment community</strong> in India 
                  for all your market related queries.
                </p>
                <a 
                  href="https://tradingqna.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary px-4 py-2 text-decoration-none d-flex align-items-center"
                  style={{ borderRadius: "25px", fontWeight: "500" }}
                >
                  Join TradingQ&A 
                  <i className="fas fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;