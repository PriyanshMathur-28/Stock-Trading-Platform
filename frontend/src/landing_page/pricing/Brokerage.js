import React from "react";

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
                <a
                  href="http://localhost:3001/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm text-decoration-none"
                >
                  <i className="fas fa-calculator me-2"></i>
                  Brokerage Calculator
                </a>
              </div>

              {/* Charges List - Accordion for Mobile */}
              <div className="row">
                <div className="col-12">
                  <h3 className="fs-4 fw-bold text-dark mb-4 text-center">
                    <i className="fas fa-info-circle text-primary me-2"></i>
                    Additional Charges
                  </h3>

                  <div className="accordion" id="chargesAccordion">
                    {/* Desktop List */}
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
                    {[
                      { id: "callTrade", icon: "fa-phone", title: "Call & Trade + RMS", desc: "₹50 + GST per order" },
                      { id: "digitalNotes", icon: "fa-envelope", title: "Digital Contract Notes", desc: "Sent via e-mail (Free)" },
                      { id: "physicalNotes", icon: "fa-file-invoice", title: "Physical Contract Notes", desc: "₹20 per note + Courier charges" },
                      { id: "nriNonPis", icon: "fa-globe-asia", title: "NRI (non-PIS)", desc: "0.5% or ₹100 per equity order (lower)" },
                      { id: "nriPis", icon: "fa-globe-asia", title: "NRI (PIS)", desc: "0.5% or ₹200 per equity order (lower)" },
                      { id: "debitBalance", icon: "fa-exclamation-triangle", title: "Debit Balance Orders", desc: "₹40 per order (instead of ₹20)" },
                    ].map((item) => (
                      <div className="accordion-item border-0 shadow-sm rounded-3 d-lg-none mb-2" key={item.id}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${item.id}`}
                          >
                            <i className={`fas ${item.icon} me-2`}></i>
                            {item.title}
                          </button>
                        </h2>
                        <div id={item.id} className="accordion-collapse collapse" data-bs-parent="#chargesAccordion">
                          <div className="accordion-body">{item.desc}</div>
                        </div>
                      </div>
                    ))}
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
              <a
                href="http://localhost:3001/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary w-100 py-3 rounded-pill fs-6 text-decoration-none"
              >
                <i className="fas fa-download me-2"></i>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
