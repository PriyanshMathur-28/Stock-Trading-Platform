import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Section Header */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8 text-center">
          <h2 className="text-muted fw-light fs-2 fs-lg-1 mb-4">Why Choose Bullzaar?</h2>
          <h1 className="display-5 fs-2 fs-md-1 fw-bold text-dark mb-0">
            Trust with <span className="text-primary">confidence</span>
          </h1>
        </div>
      </div>

      {/* Main Content Row - Responsive Grid */}
      <div className="row g-4 g-lg-5 align-items-center">
        {/* Content Column - Stacks on Mobile */}
        <div className="col-12 col-lg-7">
          <div className="p-4 p-lg-0">
            {/* Stats Cards */}
            <div className="row g-4 mb-5">
              {/* Customer Trust Card */}
              <div className="col-12 col-md-6">
                <div className="card border-0 bg-white shadow-sm rounded-3 p-4 h-100">
                  <div className="card-body">
                    <h2 className="fs-3 fw-bold text-primary mb-3">
                      <i className="fas fa-users me-2"></i>Customer-first always
                    </h2>
                    <p className="text-muted lh-lg fs-6">
                      That's why <strong>1.5+ crore customers</strong> trust Bullzaar with 
                      <strong> ₹4.5+ lakh crores</strong> worth of equity investments.
                    </p>
                  </div>
                </div>
              </div>

              {/* No Spam Card */}
              <div className="col-12 col-md-6">
                <div className="card border-0 bg-white shadow-sm rounded-3 p-4 h-100">
                  <div className="card-body">
                    <h2 className="fs-3 fw-bold text-success mb-3">
                      <i className="fas fa-shield-alt me-2"></i>No spam or gimmicks
                    </h2>
                    <p className="text-muted lh-lg fs-6">
                      No gimmicks, spam, "gamification", or annoying push notifications. 
                      <strong>High quality apps</strong> that you use at your pace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ecosystem Row */}
            <div className="row g-4 mb-5">
              <div className="col-12 col-md-6">
                <div className="card border-0 bg-white shadow-sm rounded-3 p-4 h-100">
                  <div className="card-body">
                    <h2 className="fs-3 fw-bold text-info mb-3">
                      <i className="fas fa-globe me-2"></i>The Bullzaar universe
                    </h2>
                    <p className="text-muted lh-lg fs-6">
                      Not just an app, but a <strong>whole ecosystem</strong>. 
                      Our investments in <strong>30+ fintech startups</strong> offer tailored services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card border-0 bg-white shadow-sm rounded-3 p-4 h-100">
                  <div className="card-body">
                    <h2 className="fs-3 fw-bold text-warning mb-3">
                      <i className="fas fa-chart-line me-2"></i>Do better with money
                    </h2>
                    <p className="text-muted lh-lg fs-6">
                      With initiatives like <strong>Nudge</strong> and <strong>Kill Switch</strong>, 
                      we actively help you <strong>do better with your money</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="row justify-content-center g-3">
              <div className="col-12 col-md-5">
                <Link 
                  to="/products"
                  className="btn btn-outline-primary w-100 py-3 rounded-pill fs-6"
                >
                  <i className="fas fa-rocket me-2"></i>
                  Explore our products
                </Link>
              </div>
              <div className="col-12 col-md-5">
                <Link 
                  to="/demo"
                  className="btn btn-primary w-100 py-3 rounded-pill fs-6"
                >
                  <i className="fas fa-play-circle me-2"></i>
                  Try Kite Demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Image Column - Stacks on Mobile */}
        <div className="col-12 col-lg-5 text-center">
          <div className="p-4 p-lg-0">
            <img 
              src="/media/images/ecosystem.png" 
              alt="Bullzaar Ecosystem" 
              className="img-fluid rounded shadow-lg" 
              style={{ 
                width: "clamp(250px, 80vw, 400px)", 
                maxHeight: "500px",
                objectFit: "contain"
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;