import React from "react";

function LeftSection({ 
  imageUrl, 
  productName, 
  productDescription, // Fixed: Typo in prop name
  tryDemo, 
  learnMore, 
  googlePlay, 
  appStore 
}) {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Main Row - Responsive Grid */}
      <div className="row g-4 g-lg-5 align-items-center justify-content-center">
        {/* Image Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6 text-center">
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

        {/* Content Column - Stacks on Mobile */}
        <div className="col-12 col-lg-6">
          <div className="p-4 p-lg-5">
            {/* Product Title */}
            <h1 className="display-5 fs-1 fs-md-2 fw-bold text-dark mb-4 lh-lg">
              {productName}
            </h1>
            
            {/* Description */}
            <p className="text-muted lh-lg mb-5 fs-6" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
              {productDescription}
            </p>
            
            {/* Action Buttons */}
            <div className="d-flex flex-column flex-md-row g-3 mb-4 justify-content-center justify-content-md-start">
              <a 
                href={tryDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline-primary px-4 py-3 rounded-pill fs-6 text-decoration-none d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <i className="fas fa-play-circle me-2"></i>
                Try Demo
                <i className="fas fa-arrow-right ms-2"></i>
              </a>
              <a 
                href={learnMore} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary px-4 py-3 rounded-pill fs-6 text-decoration-none d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <i className="fas fa-book me-2"></i>
                Learn More
                <i className="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
            
            {/* App Store Badges - Responsive */}
            <div className="d-flex justify-content-center justify-content-md-start g-3 flex-wrap">
              <a 
                href={googlePlay} 
                target="_blank" 
                rel="noopener noreferrer"
                className="d-inline-block"
              >
                <img 
                  src="/media/images/googlePlayBadge.svg" 
                  alt="Get on Google Play" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(120px, 30vw, 180px)", 
                    height: "auto" 
                  }} 
                />
              </a>
              <a 
                href={appStore} 
                target="_blank" 
                rel="noopener noreferrer"
                className="d-inline-block"
              >
                <img 
                  src="/media/images/appstoreBadge.svg" 
                  alt="Get on App Store" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(120px, 30vw, 180px)", 
                    height: "auto" 
                  }} 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;