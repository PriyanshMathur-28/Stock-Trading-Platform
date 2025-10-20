import React from "react";

function Hero() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Section Header - Responsive */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-10 text-center">
          <h1 className="display-4 fs-1 fs-md-2 fw-bold text-dark mb-3">
            Pricing
          </h1>
          <h3
            className="text-muted fs-2 fs-md-3 mb-0 lh-lg"
            style={{ fontSize: "clamp(1.1em, 3vw, 1.4em)" }}
          >
            <strong>Free equity investments</strong> and flat <strong>₹20</strong> intraday and F&O trades
          </h3>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="row g-4 g-lg-5 justify-content-center">
        {/* Card 1 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 text-center p-4 bg-white">
            <div className="card-body">
              <div className="mb-4">
                <img
                  src="/media/images/pricingEquity.svg"
                  alt="Free Equity Delivery"
                  className="img-fluid"
                  style={{
                    width: "clamp(80px, 20vw, 120px)",
                    height: "clamp(80px, 20vw, 120px)"
                  }}
                />
              </div>
              <h2 className="display-6 fs-2 fs-md-3 fw-bold text-success mb-3">
                ₹<span className="display-1">0</span>
              </h2>
              <h4 className="card-title fw-bold text-dark mb-4 fs-4 fs-md-5">
                Free Equity Delivery
              </h4>
              <p className="text-muted lh-lg fs-6" style={{ fontSize: "clamp(0.9em, 2.5vw, 1em)" }}>
                All equity delivery investments (NSE, BSE) are <strong>absolutely free</strong> — 
                <strong>₹0 brokerage</strong>.
              </p>
              <a
                href="http://localhost:3001/login"
                className="btn btn-success w-100 py-3 rounded-pill mt-3 fs-6"
              >
                <i className="fas fa-arrow-right me-2"></i>
                Start Investing Free
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 text-center p-4 bg-white position-relative">
            <div className="position-absolute top-0 start-50 translate-middle-x bg-primary text-white px-3 py-1 rounded-pill small fw-bold mt-2">
              Most Popular
            </div>
            <div className="card-body pt-5">
              <div className="mb-4">
                <img
                  src="/media/images/intradayTrades.svg"
                  alt="Intraday & F&O Trades"
                  className="img-fluid"
                  style={{
                    width: "clamp(80px, 20vw, 120px)",
                    height: "clamp(80px, 20vw, 120px)"
                  }}
                />
              </div>
              <h2 className="display-6 fs-2 fs-md-3 fw-bold text-primary mb-3">
                ₹<span className="display-1">20</span>
              </h2>
              <h4 className="card-title fw-bold text-dark mb-4 fs-4 fs-md-5">
                Intraday & F&O
              </h4>
              <p className="text-muted lh-lg fs-6" style={{ fontSize: "clamp(0.9em, 2.5vw, 1em)" }}>
                Flat <strong>₹20 or 0.03%</strong> (whichever lower) per order across equity, 
                currency, and commodity. <strong>₹20 flat</strong> on all options.
              </p>
              <a
                href="http://localhost:3001/login"
                className="btn btn-primary w-100 py-3 rounded-pill mt-3 fs-6"
              >
                <i className="fas fa-bolt me-2"></i>
                Start Trading Now
              </a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 text-center p-4 bg-white">
            <div className="card-body">
              <div className="mb-4">
                <img
                  src="/media/images/pricingEquity.svg"
                  alt="Free Mutual Funds"
                  className="img-fluid"
                  style={{
                    width: "clamp(80px, 20vw, 120px)",
                    height: "clamp(80px, 20vw, 120px)"
                  }}
                />
              </div>
              <h2 className="display-6 fs-2 fs-md-3 fw-bold text-success mb-3">
                ₹<span className="display-1">0</span>
              </h2>
              <h4 className="card-title fw-bold text-dark mb-4 fs-4 fs-md-5">
                Direct Mutual Funds
              </h4>
              <p className="text-muted lh-lg fs-6" style={{ fontSize: "clamp(0.9em, 2.5vw, 1em)" }}>
                All <strong>direct mutual fund</strong> investments are <strong>absolutely free</strong> — 
                <strong>₹0 commissions & DP charges</strong>.
              </p>
              <a
                href="http://localhost:3001/login"
                className="btn btn-success w-100 py-3 rounded-pill mt-3 fs-6"
              >
                <i className="fas fa-arrow-right me-2"></i>
                Invest in Funds Free
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-lg-8 text-center">
          <a
            href="http://localhost:3001/login"
            className="btn btn-primary btn-lg px-5 py-3 fs-4 shadow-lg"
            style={{ borderRadius: "50px" }}
          >
            <i className="fas fa-user-plus me-2"></i>
            Sign Up Now - It's Free!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
