import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 mb-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row g-4 g-lg-0 justify-content-center w-100">
        {/* Image Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6 text-center order-lg-2">
          <div className="p-3">
            <img 
              src="/media/images/404-kiaan.jpg" 
              alt="Kiaan looking confused - Page Not Found" 
              className="img-fluid rounded-4 shadow-lg" 
              style={{ 
                width: "100%", 
                maxHeight: "clamp(250px, 50vh, 400px)",
                objectFit: "contain"
              }} 
            />
          </div>
        </div>

        {/* Content Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6 text-center text-lg-start order-lg-1">
          <div className="p-4 p-lg-0">
            {/* 404 Badge */}
            <div className="bg-primary text-white px-4 py-2 rounded-pill d-inline-block mb-3 fs-4">
              404
            </div>
            
            {/* Main Title */}
            <h1 className="display-3 fs-1 fs-md-2 fw-bold text-dark mb-3 lh-lg">
              Kiaan couldn’t find that page
            </h1>
            
            {/* Description */}
            <p className="text-muted fs-4 fs-md-5 lh-lg mb-4" style={{ fontSize: "clamp(1em, 2.5vw, 1.25em)" }}>
              We couldn’t find the page you were looking for. 
              <br className="d-lg-none" />
              Don't worry—let's get you back on track!
            </p>
            
            {/* Home Link Button */}
            <Link 
              to="/" 
              className="btn btn-primary btn-lg px-5 py-3 rounded-pill fs-5 shadow-lg text-decoration-none d-inline-flex align-items-center"
              style={{ fontWeight: "600" }}
            >
              <i className="fas fa-home me-2"></i>
              Visit Bullzaar’s Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;