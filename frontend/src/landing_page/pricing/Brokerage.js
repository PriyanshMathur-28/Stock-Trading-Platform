import React from "react";
import { Link } from "react-router-dom";

function Brokerage() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Section Header */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8 text-center">
          <h2 className="text-muted fw-light fs-2 fs-lg-1 mb-4">Brokerage</h2>
          <h1 className="display-6 fs-2 fs-md-1 fw-bold text-dark mb-0">
            Transparent <span className="text-primary">charges</span>
          </h1>
        </div>
      </div>

      {/* Main Content Row - Responsive Grid */}
      <div className="row g-4 g-lg-5 justify-content-center">
        {/* Calculator Column - Stacks on Mobile */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5 h-100 bg-white">
            <div className="card-body">
              {/* Calculator Link */}
              <div className="d-flex justify-content-center mb-4">
                <Link 
                  to="/calculator"
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                >
                  <i className="fas fa-calculator me-2"></i>
                  Brokerage Calculator
                </Link>
              </div>

              {/* Charges List - Accordion for Mobile */}
              <div className="row">
                <div className="col-12">
                  <h3 className="fs-4 fw-bold text-dark mb-4 text-center">
                    <i className="fas fa-info-circle text-primary me-2"></i>
                    Additional Charges
                  </h3>
                  
                  <div className="accordion" id="chargesAccordion">
                    {/* Desktop: Full List | Mobile: Collapsible */}
                    <div className="accordion-item border-0 shadow-sm rounded-3 mb-3 d-none d-lg-block">
                      <div className="accordion-body p-4">
                        <ul className="list-unstyled ps-0">
                          <li className="mb-3 p-3 bg-light rounded-2">
                            <i className="fas fa-phone text-warning me-2"></i>
                            <strong>Call & Trade + RMS auto-squareoff:</strong> ₹50 + GST per order
                          </li>
                          <li className="mb-3 p-3 bg-light rounded-2">
                            <i className="fas fa-envelope text-success me-2"></i>
                            <strong>Digital contract notes:</strong> Sent via e-mail (Free)
                          </li>
                          <li className="mb-3 p-3 bg-light rounded-2">
                            <i className="fas fa-file-invoice text-info me-2"></i>
                            <strong>Physical contract notes:</strong> ₹20 per note + Courier charges
                          </li>
                          <li className="mb-3 p-3 bg-light rounded-2">
                            <i className="fas fa-globe-asia text-primary me-2"></i>
                            <strong>NRI (non-PIS):</strong> 0.5% or ₹100 per equity order (lower)
                          </li>
                          <li className="mb-3 p-3 bg-light rounded-2">
                            <i className="fas fa-globe-asia text-primary me-2"></i>
                            <strong>NRI (PIS):</strong> 0.5% or ₹200 per equity order (lower)
                          </li>
                          <li className="mb-3 p-3 bg-light rounded-2">
                            <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                            <strong>Debit balance orders:</strong> ₹40 per order (instead of ₹20)
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Mobile Accordion Items */}
                    <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#callTrade">
                          <i className="fas fa-phone me-2"></i>Call & Trade + RMS
                        </button>
                      </h2>
                      <div id="callTrade" className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                        <div className="accordion-body">
                          ₹50 + GST per order
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#digitalNotes">
                          <i className="fas fa-envelope me-2"></i>Digital Contract Notes
                        </button>
                      </h2>
                      <div id="digitalNotes" className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                        <div className="accordion-body">
                          Sent via e-mail (Free)
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#physicalNotes">
                          <i className="fas fa-file-invoice me-2"></i>Physical Contract Notes
                        </button>
                      </h2>
                      <div id="physicalNotes" className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                        <div className="accordion-body">
                          ₹20 per note + Courier charges
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#nriNonPis">
                          <i className="fas fa-globe-asia me-2"></i>NRI (non-PIS)
                        </button>
                      </h2>
                      <div id="nriNonPis" className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                        <div className="accordion-body">
                          0.5% or ₹100 per equity order (lower)
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#nriPis">
                          <i className="fas fa-globe-asia me-2"></i>NRI (PIS)
                        </button>
                      </h2>
                      <div id="nriPis" className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                        <div className="accordion-body">
                          0.5% or ₹200 per equity order (lower)
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#debitBalance">
                          <i className="fas fa-exclamation-triangle me-2"></i>Debit Balance Orders
                        </button>
                      </h2>
                      <div id="debitBalance" className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                        <div className="accordion-body">
                          ₹40 per order (instead of ₹20)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charges List Column */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 p-4 h-100 bg-white text-center">
            <div className="card-body">
              <h3 className="fs-3 fw-bold text-primary mb-4">
                <i className="fas fa-list me-2"></i>
                Full List of Charges
              </h3>
              <Link 
                to="/charges"
                className="btn btn-outline-primary w-100 py-3 rounded-pill fs-6"
              >
                <i className="fas fa-download me-2"></i>
                Download PDF
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;