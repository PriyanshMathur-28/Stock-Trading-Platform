// import React from "react";
// import { Link } from "react-router-dom";


// const Funds = () => {
//   return (
//     <>
//       <div className="funds">
//         <p>Instant, zero-cost fund transfers with UPI </p>
//         <Link className="btn btn-green">Add funds</Link>
//         <Link className="btn btn-blue">Withdraw</Link>
//       </div>

//       <div className="row">
//         <div className="col">
//           <span>
//             <p>Equity</p>
//           </span>

//           <div className="table">
//             <div className="data">
//               <p>Available margin</p>
//               <p className="imp colored">4,043.10</p>
//             </div>
//             <div className="data">
//               <p>Used margin</p>
//               <p className="imp">3,757.30</p>
//             </div>
//             <div className="data">
//               <p>Available cash</p>
//               <p className="imp">4,043.10</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Opening Balance</p>
//               <p>4,043.10</p>
//             </div>
//             <div className="data">
//               <p>Opening Balance</p>
//               <p>3736.40</p>
//             </div>
//             <div className="data">
//               <p>Payin</p>
//               <p>4064.00</p>
//             </div>
//             <div className="data">
//               <p>SPAN</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Delivery margin</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Exposure</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Options premium</p>
//               <p>0.00</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Collateral (Liquid funds)</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Collateral (Equity)</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Total Collateral</p>
//               <p>0.00</p>
//             </div>
//           </div>
//         </div>

//         <div className="col">
//           <div className="commodity">
//             <p>You don't have a commodity account</p>
//             <Link className="btn btn-blue">Open Account</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Funds;












import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Funds.css"; // Make sure to create this CSS file

const Funds = () => {
  // Sample data structure - replace with actual API call
  const [fundsData] = useState({
    equity: {
      availableMargin: 4043.10,
      usedMargin: 3757.30,
      availableCash: 4043.10,
      openingBalance: 4043.10,
      previousBalance: 3736.40,
      payin: 4064.00,
      span: 0.00,
      deliveryMargin: 0.00,
      exposure: 0.00,
      optionsPremium: 0.00,
      collateral: {
        liquidFunds: 0.00,
        equity: 0.00,
        total: 0.00
      }
    },
    hasCommodityAccount: false,
    lastUpdated: new Date().toLocaleString()
  });

  // const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('equity');

  // Uncomment this for real API integration
  /*
  useEffect(() => {
    const fetchFundsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/funds");
        setFundsData(response.data);
      } catch (error) {
        console.error("Error fetching funds data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFundsData();
  }, []);
  */

  const formatCurrency = (value) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calculateTotalCollateral = () => {
    return fundsData.equity.collateral.liquidFunds + fundsData.equity.collateral.equity;
  };

  return (
    <div className="funds-container">
      {/* Header Section */}
      <div className="funds-header">
        <h2>Funds Management</h2>
        <p className="upi-notice">Instant, zero-cost fund transfers with UPI</p>
        <div className="action-buttons">
          <Link to="/add-funds" className="btn btn-green">
            <i className="fas fa-plus-circle"></i> Add funds
          </Link>
          <Link to="/withdraw" className="btn btn-blue">
            <i className="fas fa-money-bill-wave"></i> Withdraw
          </Link>
        </div>
        <p className="last-updated">Last updated: {fundsData.lastUpdated}</p>
      </div>

      {/* Main Content */}
      <div className="funds-content">
        {/* Navigation Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'equity' ? 'active' : ''}`}
            onClick={() => setActiveTab('equity')}
          >
            Equity
          </button>
          <button 
            className={`tab ${activeTab === 'commodity' ? 'active' : ''}`}
            onClick={() => setActiveTab('commodity')}
            disabled={!fundsData.hasCommodityAccount}
          >
            Commodity
          </button>
        </div>

        {/* Equity Tab Content */}
        {activeTab === 'equity' && (
          <div className="equity-section">
            <div className="summary-cards">
              <div className="card available-margin">
                <h4>Available Margin</h4>
                <p className="value">{formatCurrency(fundsData.equity.availableMargin)}</p>
                <p className="label">For new positions</p>
              </div>
              <div className="card used-margin">
                <h4>Used Margin</h4>
                <p className="value">{formatCurrency(fundsData.equity.usedMargin)}</p>
                <p className="label">In current positions</p>
              </div>
              <div className="card available-cash">
                <h4>Available Cash</h4>
                <p className="value">{formatCurrency(fundsData.equity.availableCash)}</p>
                <p className="label">For withdrawal</p>
              </div>
            </div>

            <div className="detailed-table">
              <h4>Detailed Breakdown</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Opening Balance</td>
                    <td>{formatCurrency(fundsData.equity.openingBalance)}</td>
                  </tr>
                  <tr>
                    <td>Previous Balance</td>
                    <td>{formatCurrency(fundsData.equity.previousBalance)}</td>
                  </tr>
                  <tr>
                    <td>Payin</td>
                    <td className="positive">{formatCurrency(fundsData.equity.payin)}</td>
                  </tr>
                  <tr className="divider">
                    <td colSpan="2"><hr /></td>
                  </tr>
                  <tr>
                    <td>SPAN</td>
                    <td>{formatCurrency(fundsData.equity.span)}</td>
                  </tr>
                  <tr>
                    <td>Delivery Margin</td>
                    <td>{formatCurrency(fundsData.equity.deliveryMargin)}</td>
                  </tr>
                  <tr>
                    <td>Exposure</td>
                    <td>{formatCurrency(fundsData.equity.exposure)}</td>
                  </tr>
                  <tr>
                    <td>Options Premium</td>
                    <td>{formatCurrency(fundsData.equity.optionsPremium)}</td>
                  </tr>
                  <tr className="divider">
                    <td colSpan="2"><hr /></td>
                  </tr>
                  <tr>
                    <td>Collateral (Liquid funds)</td>
                    <td>{formatCurrency(fundsData.equity.collateral.liquidFunds)}</td>
                  </tr>
                  <tr>
                    <td>Collateral (Equity)</td>
                    <td>{formatCurrency(fundsData.equity.collateral.equity)}</td>
                  </tr>
                  <tr className="total">
                    <td>Total Collateral</td>
                    <td>{formatCurrency(calculateTotalCollateral())}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Commodity Tab Content */}
        {activeTab === 'commodity' && (
          <div className="commodity-section">
            {fundsData.hasCommodityAccount ? (
              <div className="commodity-account">
                <h4>Commodity Account Details</h4>
                {/* Add commodity account details here */}
                <p>Your commodity account information will appear here</p>
              </div>
            ) : (
              <div className="no-commodity">
                <i className="fas fa-box-open"></i>
                <h4>No Commodity Account</h4>
                <p>You don't currently have a commodity trading account</p>
                <Link to="/open-commodity" className="btn btn-blue">
                  <i className="fas fa-plus"></i> Open Commodity Account
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Funds;
