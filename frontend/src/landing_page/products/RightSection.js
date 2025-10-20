import React from "react";

function RightSection({ 
  imageUrl, 
  productName, 
  productDescription, // Fixed: Typo in prop name
  learnMore 
}) {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Main Row - Responsive Grid */}
      <div className="row g-4 g-lg-5 align-items-center justify-content-center">
        {/* Content Column - Stacks on Mobile (LEFT on Desktop) */}
        <div className="col-12 col-lg-6 order-lg-1 order-2">
          <div className="p-4 p-lg-5 text-start">
            {/* Product Title */}
            <h1 className="display-5 fs-1 fs-md-2 fw-bold text-dark mb-4 lh-lg">
              {productName}
            </h1>
            
            {/* Description */}
            <p className="text-muted lh-lg mb-5 fs-6" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
              {productDescription}
            </p>
            
            {/* Action Button */}
            <a 
              href={learnMore} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary px-4 py-3 rounded-pill fs-6 text-decoration-none d-inline-flex align-items-center"
              style={{ fontWeight: "500" }}
            >
              <i className="fas fa-book me-2"></i>
              Learn More
              <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>

        {/* Image Column - Stacks on Mobile (RIGHT on Desktop) */}
        <div className="col-12 col-lg-6 text-center order-lg-2 order-1">
          <div className="p-3 p-lg-0">
            <img 
              src={imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`} // Ensures public folder path
              alt={`${productName} Screenshot`} 
              className="img-fluid rounded-4 shadow-lg" 
              style={{ 
                width: "100%", 
                maxHeight: "clamp(250px, 50vh, 400px)",
                objectFit: "cover"
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSection;