import React, { useState } from "react";
import { jsPDF } from "jspdf";

function Brokerage() {
  const [tradeType, setTradeType] = useState("equity");
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState("regular");
  const [isNRI, setIsNRI] = useState(false);
  const [isPIS, setIsPIS] = useState(false);
  const [isDebitBalance, setIsDebitBalance] = useState(false);
  const [result, setResult] = useState(null);

  const calculateBrokerage = () => {
    let brokerage = 0;
    const amountValue = parseFloat(amount) || 0;

    if (tradeType === "equity") {
      if (isNRI && !isPIS) {
        brokerage = Math.min(amountValue * 0.005, 100);
      } else if (isNRI && isPIS) {
        brokerage = Math.min(amountValue * 0.005, 200);
      } else {
        brokerage = isDebitBalance ? 40 : 20;
      }
    }

    if (orderType === "callTrade") {
      brokerage += 50 * 1.18; // Including 18% GST
    }

    setResult({
      baseBrokerage: isNRI ? brokerage : isDebitBalance ? 40 : 20,
      callTrade: orderType === "callTrade" ? 50 * 1.18 : 0,
      total: brokerage,
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Brokerage Calculation Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Trade Type: ${tradeType.charAt(0).toUpperCase() + tradeType.slice(1)}`, 20, 40);
    doc.text(`Amount: ₹${amount || 0}`, 20, 50);
    doc.text(`Order Type: ${orderType === "callTrade" ? "Call & Trade" : "Regular"}`, 20, 60);
    doc.text(`NRI: ${isNRI ? (isPIS ? "PIS" : "Non-PIS") : "No"}`, 20, 70);
    doc.text(`Debit Balance: ${isDebitBalance ? "Yes" : "No"}`, 20, 80);
    if (result) {
      doc.text("Calculation Results:", 20, 100);
      doc.text(`Base Brokerage: ₹${result.baseBrokerage.toFixed(2)}`, 20, 110);
      doc.text(`Call & Trade (with GST): ₹${result.callTrade.toFixed(2)}`, 20, 120);
      doc.text(`Total Brokerage: ₹${result.total.toFixed(2)}`, 20, 130);
    }
    doc.text("Additional Charges:", 20, 150);
    doc.text("Digital Contract Notes: Free", 20, 160);
    doc.text("Physical Contract Notes: ₹20 per note + Courier", 20, 170);
    doc.save("Brokerage_Report.pdf");
  };

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
        {/* Calculator Column */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5 h-100 bg-white">
            <div className="card-body">
              {/* Calculator Form */}
              <div className="mb-4">
                <h3 className="fs-4 fw-bold text-dark mb-4 text-center">
                  <i className="fas fa-calculator text-primary me-2"></i>
                  Brokerage Calculator
                </h3>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">Trade Type</label>
                    <select
                      className="form-select rounded-pill"
                      value={tradeType}
                      onChange={(e) => setTradeType(e.target.value)}
                    >
                      <option value="equity">Equity</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">Trade Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control rounded-pill"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">Order Type</label>
                    <select
                      className="form-select rounded-pill"
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                    >
                      <option value="regular">Regular</option>
                      <option value="callTrade">Call & Trade</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">NRI Status</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isNRI}
                        onChange={(e) => setIsNRI(e.target.checked)}
                      />
                      <label className="form-check-label">Is NRI?</label>
                    </div>
                    {isNRI && (
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={isPIS}
                          onChange={(e) => setIsPIS(e.target.checked)}
                        />
                        <label className="form-check-label">PIS Account</label>
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isDebitBalance}
                        onChange={(e) => setIsDebitBalance(e.target.checked)}
                      />
                      <label className="form-check-label">Debit Balance Order</label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                      onClick={calculateBrokerage}
                    >
                      Calculate
                    </button>
                  </div>
                </div>
                {result && (
                  <div className="mt-4 p-3 bg-light rounded-3 text-center">
                    <h4 className="fs-5 fw-bold">Calculation Results</h4>
                    <p>Base Brokerage: ₹{result.baseBrokerage.toFixed(2)}</p>
                    <p>Call & Trade (with GST): ₹{result.callTrade.toFixed(2)}</p>
                    <p className="fw-bold">Total Brokerage: ₹{result.total.toFixed(2)}</p>
                  </div>
                )}
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
              <button
                className="btn btn-outline-primary w-100 py-3 rounded-pill fs-6"
                onClick={downloadPDF}
              >
                <i className="fas fa-download me-2"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;