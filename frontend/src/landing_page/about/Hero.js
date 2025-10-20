import React from "react";

function Hero() {
  return (
    <div className="container-fluid px-4 px-lg-5">
      {/* Hero Title - Responsive */}
      <div className="row justify-content-center p-3 p-md-5 mb-5 mt-4">
        <div className="col-12 col-lg-10">
          <h1 className="text-center text-muted lh-lg">
            <span className="fs-1 fs-md-2 fw-bold">We pioneered the discount broking model in India.</span><br />
            <span className="fs-5 fs-md-3 mt-3">Now, we're breaking ground with our technology.</span>
          </h1>
        </div>
      </div>

      {/* Content Section - Responsive Grid */}
      <div className="row g-4 g-lg-5 border-top">
        {/* Left Column - Responsive */}
        <div className="col-12 col-lg-6 px-3 px-lg-5 py-4">
          <div className="text-muted lh-lg" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
            <p className="mb-4">
              We kick-started operations on the <strong>15th of August, 2010</strong> with the goal of 
              breaking all barriers that traders and investors face in India in terms of cost, support, and technology. 
              We named the company <strong>Bullzaar</strong>, a combination of Zero and "Rodha", the Sanskrit word for barrier.
            </p>
            <p className="mb-4">
              Today, our disruptive pricing models and in-house technology have made us the <strong>biggest stock broker in India</strong>.
            </p>
            <p className="mb-0">
              Over <strong>1+ Crore clients</strong> place millions of orders every day through our powerful ecosystem of investment platforms, 
              contributing over <strong>15% of all Indian retail trading volumes</strong>.
            </p>
          </div>
        </div>

        {/* Right Column - Responsive */}
        <div className="col-12 col-lg-6 px-3 px-lg-5 py-4">
          <div className="text-muted lh-lg" style={{ fontSize: "clamp(0.95em, 2.5vw, 1.1em)" }}>
            <p className="mb-4">
              In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
            </p>
            <p className="mb-4">
              <a 
                href="https://rainmatter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none fw-bold"
                style={{ color: "#387ed1" }}
              >
                Rainmatter
              </a>
              , our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
            </p>
            <p className="mb-0">
              And yet, we're always up to something new every day. Catch up on the latest updates on our <strong>blog</strong> or see what the <strong>media</strong> is saying about us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;