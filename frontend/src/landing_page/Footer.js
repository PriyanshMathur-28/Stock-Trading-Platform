import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#fbfbfb" }} className="border-top">
      <div className="container-fluid px-4 px-lg-5">
        {/* Main Footer Row - Responsive */}
        <div className="row g-4 g-lg-5 py-5">
          {/* Brand & Social Column */}
          <div className="col-12 col-lg-4">
            <div className="text-center text-lg-start">
              <Link to="/" className="d-block mb-3">
                <img 
                  src="/media/images/logo.jpg" 
                  alt="Bullzaar Logo" 
                  className="img-fluid" 
                  style={{ 
                    width: "clamp(120px, 30vw, 200px)", 
                    height: "auto" 
                  }} 
                />
              </Link>
              <p className="text-muted mb-4 small lh-lg" style={{ fontSize: "clamp(0.85em, 2vw, 1em)" }}>
                &copy; 2010 - 2025, Bullzaar Broking Ltd. All rights reserved.
              </p>
              {/* Social Icons - Single Responsive Row */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-3 mb-4">
                <a href="https://x.com/Bullzaar" target="_blank" rel="noopener noreferrer" className="text-muted fs-4" aria-label="Twitter">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="https://facebook.com/Bullzaar" target="_blank" rel="noopener noreferrer" className="text-muted fs-4" aria-label="Facebook">
                  <i className="fab fa-square-facebook"></i>
                </a>
                <a href="https://instagram.com/Bullzaar" target="_blank" rel="noopener noreferrer" className="text-muted fs-4" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/company/Bullzaar" target="_blank" rel="noopener noreferrer" className="text-muted fs-4" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://youtube.com/Bullzaar" target="_blank" rel="noopener noreferrer" className="text-muted fs-4" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://t.me/Bullzaar" target="_blank" rel="noopener noreferrer" className="text-muted fs-4" aria-label="Telegram">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Company Nav Column */}
          <div className="col-12 col-lg-2">
            <h5 className="fw-bold text-dark mb-3">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none hover-text-primary">About</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-muted text-decoration-none hover-text-primary">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/pricing" className="text-muted text-decoration-none hover-text-primary">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link to="/referral" className="text-muted text-decoration-none hover-text-primary">Referral Programme</Link>
              </li>
              <li className="mb-2">
                <Link to="/careers" className="text-muted text-decoration-none hover-text-primary">Careers</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-muted text-decoration-none hover-text-primary">Bullzaar.tech</Link>
              </li>
              <li className="mb-2">
                <Link to="/press" className="text-muted text-decoration-none hover-text-primary">Press & Media</Link>
              </li>
              <li className="mb-2">
                <Link to="/csr" className="text-muted text-decoration-none hover-text-primary">Bullzaar Cares (CSR)</Link>
              </li>
            </ul>
          </div>

          {/* Support Nav Column */}
          <div className="col-12 col-lg-3">
            <h5 className="fw-bold text-dark mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none hover-text-primary">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/support" className="text-muted text-decoration-none hover-text-primary">Support Portal</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-muted text-decoration-none hover-text-primary">Z-Connect Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/charges" className="text-muted text-decoration-none hover-text-primary">List of Charges</Link>
              </li>
              <li className="mb-2">
                <Link to="/downloads" className="text-muted text-decoration-none hover-text-primary">Downloads & Resources</Link>
              </li>
            </ul>
          </div>

          {/* Account Nav Column */}
          <div className="col-12 col-lg-3">
            <h5 className="fw-bold text-dark mb-3">Account</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/register" className="text-muted text-decoration-none hover-text-primary">Open an Account</Link>
              </li>
              <li className="mb-2">
                <Link to="/fund-transfer" className="text-muted text-decoration-none hover-text-primary">Fund Transfer</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Text - Responsive Cards/Accordion */}
        <div className="row g-4 mb-4">
          <div className="col-12">
            <div className="accordion" id="legalAccordion"> {/* Mobile: Collapsible */}
              <div className="accordion-item border-0 bg-transparent">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed text-muted fw-medium ps-0" type="button" data-bs-toggle="collapse" data-bs-target="#legalCollapse">
                    <i className="fas fa-file-contract me-2"></i>Legal Disclosures & Risk Warnings
                  </button>
                </h2>
                <div id="legalCollapse" className="accordion-collapse collapse show d-lg-block" data-bs-parent="#legalAccordion">
                  <div className="accordion-body pt-0">
                    <div className="row g-3">
                      <div className="col-lg-4">
                        <p className="small lh-lg mb-0 text-muted">
                          Bullzaar Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633. CDSL/NSDL: Depository services through Bullzaar Broking Ltd. – SEBI Registration no.: IN-DP-431-2019. Commodity Trading through Bullzaar Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238. Registered Address: Bullzaar Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="small lh-lg mb-0 text-muted">
                          For any complaints pertaining to securities broking please write to complaints@Bullzaar.com, for DP related to dp@Bullzaar.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances Smart Online Dispute Resolution | Grievances Redressal Mechanism.
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="small lh-lg mb-0 text-muted">
                          Investments in securities market are subject to market risks; read all the related documents carefully before investing. Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
                        </p>
                      </div>
                    </div>
                    <div className="row g-3 mt-3">
                      <div className="col-12">
                        <p className="small lh-lg mb-0 text-muted">
                          "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Bullzaar and offering such services, please create a ticket here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Links - Responsive Nav */}
        <div className="row justify-content-center pb-4">
          <div className="col-12">
            <ul className="list-inline text-center mb-0 small">
              <li className="list-inline-item me-3">
                <Link to="/nse" className="text-muted text-decoration-none hover-text-primary">NSE</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/bse" className="text-muted text-decoration-none hover-text-primary">BSE</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/mcx" className="text-muted text-decoration-none hover-text-primary">MCX</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/terms" className="text-muted text-decoration-none hover-text-primary">Terms & Conditions</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/policies" className="text-muted text-decoration-none hover-text-primary">Policies and Procedures</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/privacy" className="text-muted text-decoration-none hover-text-primary">Privacy Policy</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/disclosure" className="text-muted text-decoration-none hover-text-primary">Disclosure</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="/investors" className="text-muted text-decoration-none hover-text-primary">For Investors Attention</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/charter" className="text-muted text-decoration-none hover-text-primary">Investors Charter</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;