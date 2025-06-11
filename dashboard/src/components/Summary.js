import React from "react";
import { useStock } from "../context/StockContext";

const Summary = () => {
  const { latestPrices, performance, fundamentals, loading } = useStock();

  if (loading) {
    return <div>Loading market data...</div>;
  }

  // Calculate portfolio summary
  const totalStocks = latestPrices.length;
  const avgPerformance = performance.length > 0 
    ? (performance.reduce((acc, stock) => acc + parseFloat(stock.daily || 0), 0) / performance.length).toFixed(2)
    : '0.00';

  // Mock portfolio values - in real app, these would come from user's actual holdings
  const mockPortfolioValue = 31430;
  const mockInvestment = 29880;
  const mockPnL = mockPortfolioValue - mockInvestment;
  const mockPnLPercent = ((mockPnL / mockInvestment) * 100).toFixed(2);

  return (
    <>
      <div className="username">
        <h6>Hi, Trader!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Market Overview</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{totalStocks}</h3>
            <p>Stocks tracked</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Avg Daily Change <span className={parseFloat(avgPerformance) >= 0 ? 'up' : 'down'}>
                {avgPerformance}%
              </span>
            </p>
            <p>
              Last Updated <span>{new Date().toLocaleTimeString()}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Portfolio ({totalStocks})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={parseFloat(mockPnLPercent) >= 0 ? "profit" : "loss"}>
              {mockPnL.toLocaleString()} <small>{mockPnLPercent >= 0 ? '+' : ''}{mockPnLPercent}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{mockPortfolioValue.toLocaleString()}</span>
            </p>
            <p>
              Investment <span>{mockInvestment.toLocaleString()}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Market Highlights */}
      <div className="section">
        <span>
          <p>Top Performers Today</p>
        </span>
        
        <div className="market-highlights">
          {performance.slice(0, 3).map((stock, index) => (
            <div key={stock.symbol} className="highlight-item">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className={`performance ${parseFloat(stock.daily) >= 0 ? 'profit' : 'loss'}`}>
                {stock.daily}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Summary;