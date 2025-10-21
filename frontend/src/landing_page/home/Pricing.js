import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5">
      {/* Section Header */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8 text-center">
          <h2 className="text-muted fw-light fs-2 fs-lg-1 mb-4">Pricing</h2>
          <h1 className="display-5 fs-2 fs-md-1 fw-bold text-dark mb-3">
            Unbeatable pricing
          </h1>
          <p className="text-muted fs-6 lh-lg mb-4" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
            We pioneered the concept of <strong>discount broking</strong> and <strong>price transparency</strong> in India. 
            Flat fees and <strong>no hidden charges</strong>.
          </p>
          <Link 
            to="/pricing-details"
            className="btn btn-outline-primary px-4 py-2 text-decoration-none d-inline-flex align-items-center"
            style={{ borderRadius: "25px", fontWeight: "500" }}
          >
            See pricing <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      {/* Pricing Cards - Responsive Grid */}
      <div className="row justify-content-center g-4">
        {/* Free Plan Card */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center">
            <div className="card-body">
              <h1 className="display-1 fw-bold text-success mb-3">₹<span className="display-4">0</span></h1>
              <h5 className="card-title fw-bold text-dark mb-4">Free Forever</h5>
              <ul className="list-unstyled mb-4">
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>Equity Delivery</strong>
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>Direct Mutual Funds</strong>
                </li>
              </ul>
              <Link to="https://stock-trading-platform-three.vercel.app/" className="btn btn-success w-100 py-3 rounded-pill">
                <i className="fas fa-user-plus me-2"></i>
                Get Started Free
              </Link>
            </div>
          </div>
        </div>

        {/* Pro Plan Card - Highlighted */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center position-relative">
            {/* Popular Badge */}
            <div className="position-absolute top-0 start-50 translate-middle-x bg-primary text-white px-3 py-1 rounded-pill small fw-bold mt-2">
              Most Popular
            </div>
            <div className="card-body pt-5">
              <h1 className="display-1 fw-bold text-primary mb-3">₹<span className="display-4">20</span></h1>
              <h5 className="card-title fw-bold text-dark mb-4">Per Order</h5>
              <ul className="list-unstyled mb-4">
                <li className="mb-3">
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  <strong>Intraday</strong>
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  <strong>Futures & Options</strong>
                </li>
              </ul>
              <Link to="https://stock-trading-platform-three.vercel.app/" className="btn btn-primary w-100 py-3 rounded-pill">
                <i className="fas fa-bolt me-2"></i>
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;