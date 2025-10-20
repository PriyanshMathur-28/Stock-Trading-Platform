import React from "react";
import { Link } from "react-router-dom"; // For SPA navigation (if needed)

function CreateTicket() {
  return (
    <div className="container-fluid px-4 px-lg-5 py-5 bg-light">
      {/* Header - Responsive */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8 text-center">
          <h1 className="display-5 fs-1 fs-md-2 fw-bold text-dark mb-3 lh-lg">
            Create a Support Ticket
          </h1>
          <p className="text-muted fs-4 fs-md-5 lh-lg mb-0" style={{ fontSize: "clamp(1em, 2.5vw, 1.2em)" }}>
            Select a relevant topic to get started. We'll guide you through the process.
          </p>
        </div>
      </div>

      {/* Categories Grid - Responsive */}
      <div className="row g-4 g-lg-5 justify-content-center">
        {/* Category 1: Account Opening */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 bg-white">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold text-primary mb-3 d-flex align-items-center">
                <i className="fas fa-user-plus me-2 text-primary"></i>
                Account Opening
              </h4>
              <div className="d-lg-block d-none"> {/* Desktop: Inline List */}
                <ul className="list-unstyled ps-0">
                  <li className="mb-2">
                    <Link to="/support/account-online" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Online Account Opening
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/account-offline" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Offline Account Opening
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/account-business" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Company, Partnership & HUF
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/account-nri" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      NRI Account Opening
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="accordion d-lg-none" id="accountAccordion"> {/* Mobile: Accordion */}
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#accountCollapse">
                      View Subtopics
                    </button>
                  </h2>
                  <div id="accountCollapse" className="accordion-collapse collapse" data-bs-parent="#accountAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled ps-0">
                        <li className="mb-2">
                          <Link to="/support/account-online" className="text-decoration-none text-muted d-block py-1">
                            Online Account Opening
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/support/account-offline" className="text-decoration-none text-muted d-block py-1">
                            Offline Account Opening
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/support/account-business" className="text-decoration-none text-muted d-block py-1">
                            Company, Partnership & HUF
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/support/account-nri" className="text-decoration-none text-muted d-block py-1">
                            NRI Account Opening
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 2: Trading Platforms */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 bg-white">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold text-success mb-3 d-flex align-items-center">
                <i className="fas fa-chart-line me-2 text-success"></i>
                Trading Platforms
              </h4>
              <div className="d-lg-block d-none">
                <ul className="list-unstyled ps-0">
                  <li className="mb-2">
                    <Link to="/support/trading-kite" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Kite Web & Mobile Issues
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/trading-orders" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Order Placement & Execution
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/trading-charts" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Charts & Technical Analysis
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/trading-margins" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Margin & Leverage Queries
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="accordion d-lg-none" id="tradingAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#tradingCollapse">
                      View Subtopics
                    </button>
                  </h2>
                  <div id="tradingCollapse" className="accordion-collapse collapse" data-bs-parent="#tradingAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled ps-0">
                        <li className="mb-2"><Link to="/support/trading-kite" className="text-decoration-none text-muted d-block py-1">Kite Web & Mobile Issues</Link></li>
                        <li className="mb-2"><Link to="/support/trading-orders" className="text-decoration-none text-muted d-block py-1">Order Placement & Execution</Link></li>
                        <li className="mb-2"><Link to="/support/trading-charts" className="text-decoration-none text-muted d-block py-1">Charts & Technical Analysis</Link></li>
                        <li className="mb-2"><Link to="/support/trading-margins" className="text-decoration-none text-muted d-block py-1">Margin & Leverage Queries</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 3: Mutual Funds */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 bg-white">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold text-info mb-3 d-flex align-items-center">
                <i className="fas fa-coins me-2 text-info"></i>
                Mutual Funds
              </h4>
              <div className="d-lg-block d-none">
                <ul className="list-unstyled ps-0">
                  <li className="mb-2">
                    <Link to="/support/funds-coin" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Coin by Bullzaar
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/funds-sip" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      SIP & Investment Plans
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/funds-redemption" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Redemption & Withdrawals
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/funds-portfolio" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Portfolio Tracking
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="accordion d-lg-none" id="fundsAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#fundsCollapse">
                      View Subtopics
                    </button>
                  </h2>
                  <div id="fundsCollapse" className="accordion-collapse collapse" data-bs-parent="#fundsAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled ps-0">
                        <li className="mb-2"><Link to="/support/funds-coin" className="text-decoration-none text-muted d-block py-1">Coin by Bullzaar</Link></li>
                        <li className="mb-2"><Link to="/support/funds-sip" className="text-decoration-none text-muted d-block py-1">SIP & Investment Plans</Link></li>
                        <li className="mb-2"><Link to="/support/funds-redemption" className="text-decoration-none text-muted d-block py-1">Redemption & Withdrawals</Link></li>
                        <li className="mb-2"><Link to="/support/funds-portfolio" className="text-decoration-none text-muted d-block py-1">Portfolio Tracking</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 4: API & Tech */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 bg-white">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold text-warning mb-3 d-flex align-items-center">
                <i className="fas fa-code me-2 text-warning"></i>
                API & Technology
              </h4>
              <div className="d-lg-block d-none">
                <ul className="list-unstyled ps-0">
                  <li className="mb-2">
                    <Link to="/support/api-kiteconnect" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Kite Connect API
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/tech-integration" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Integration Help
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/tech-errors" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Error Codes & Debugging
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/tech-docs" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      API Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="accordion d-lg-none" id="apiAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#apiCollapse">
                      View Subtopics
                    </button>
                  </h2>
                  <div id="apiCollapse" className="accordion-collapse collapse" data-bs-parent="#apiAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled ps-0">
                        <li className="mb-2"><Link to="/support/api-kiteconnect" className="text-decoration-none text-muted d-block py-1">Kite Connect API</Link></li>
                        <li className="mb-2"><Link to="/support/tech-integration" className="text-decoration-none text-muted d-block py-1">Integration Help</Link></li>
                        <li className="mb-2"><Link to="/support/tech-errors" className="text-decoration-none text-muted d-block py-1">Error Codes & Debugging</Link></li>
                        <li className="mb-2"><Link to="/support/tech-docs" className="text-decoration-none text-muted d-block py-1">API Documentation</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 5: Billing & Charges */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 bg-white">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold text-danger mb-3 d-flex align-items-center">
                <i className="fas fa-credit-card me-2 text-danger"></i>
                Billing & Charges
              </h4>
              <div className="d-lg-block d-none">
                <ul className="list-unstyled ps-0">
                  <li className="mb-2">
                    <Link to="/support/billing-ledger" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Ledger & Statements
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/billing-charges" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Brokerage & Fees
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/billing-refunds" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Refunds & Adjustments
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/billing-tax" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Taxes & TDS
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="accordion d-lg-none" id="billingAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#billingCollapse">
                      View Subtopics
                    </button>
                  </h2>
                  <div id="billingCollapse" className="accordion-collapse collapse" data-bs-parent="#billingAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled ps-0">
                        <li className="mb-2"><Link to="/support/billing-ledger" className="text-decoration-none text-muted d-block py-1">Ledger & Statements</Link></li>
                        <li className="mb-2"><Link to="/support/billing-charges" className="text-decoration-none text-muted d-block py-1">Brokerage & Fees</Link></li>
                        <li className="mb-2"><Link to="/support/billing-refunds" className="text-decoration-none text-muted d-block py-1">Refunds & Adjustments</Link></li>
                        <li className="mb-2"><Link to="/support/billing-tax" className="text-decoration-none text-muted d-block py-1">Taxes & TDS</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 6: General Support */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 bg-white">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold text-secondary mb-3 d-flex align-items-center">
                <i className="fas fa-headset me-2 text-secondary"></i>
                General Support
              </h4>
              <div className="d-lg-block d-none">
                <ul className="list-unstyled ps-0">
                  <li className="mb-2">
                    <Link to="/support/general-password" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Password & Login
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/general-updates" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      App & Software Updates
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/general-feedback" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Feedback & Suggestions
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support/general-escalate" className="text-decoration-none text-muted fw-medium d-block py-2 px-3 rounded-3 hover-bg-light">
                      Escalate a Ticket
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="accordion d-lg-none" id="generalAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#generalCollapse">
                      View Subtopics
                    </button>
                  </h2>
                  <div id="generalCollapse" className="accordion-collapse collapse" data-bs-parent="#generalAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled ps-0">
                        <li className="mb-2"><Link to="/support/general-password" className="text-decoration-none text-muted d-block py-1">Password & Login</Link></li>
                        <li className="mb-2"><Link to="/support/general-updates" className="text-decoration-none text-muted d-block py-1">App & Software Updates</Link></li>
                        <li className="mb-2"><Link to="/support/general-feedback" className="text-decoration-none text-muted d-block py-1">Feedback & Suggestions</Link></li>
                        <li className="mb-2"><Link to="/support/general-escalate" className="text-decoration-none text-muted d-block py-1">Escalate a Ticket</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA - Responsive */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-lg-6">
          <Link to="/register" className="btn btn-primary btn-lg w-100 py-3 rounded-pill fs-5 shadow-lg d-flex align-items-center justify-content-center">
            <i className="fas fa-ticket-alt me-2"></i>
            Can't Find What You Need? Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;