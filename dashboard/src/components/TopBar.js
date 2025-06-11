import React, { useState, useEffect } from "react";
import { useStock } from "../context/StockContext";
import Menu from "./Menu";

const TopBar = () => {
  const { latestPrices } = useStock();
  const [indices, setIndices] = useState({
    nifty: { value: 0, change: 0 },
    sensex: { value: 0, change: 0 }
  });

  useEffect(() => {
    // Simulate index data based on major stocks
    if (latestPrices.length > 0) {
      const majorStocks = latestPrices.slice(0, 5);
      const avgChange = majorStocks.reduce((acc, stock) => acc + parseFloat(stock.cp || 0), 0) / majorStocks.length;
      
      setIndices({
        nifty: { 
          value: 19500 + (avgChange * 10), 
          change: avgChange.toFixed(2) 
        },
        sensex: { 
          value: 65000 + (avgChange * 50), 
          change: avgChange.toFixed(2) 
        }
      });
    }
  }, [latestPrices]);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{indices.nifty.value.toFixed(2)}</p>
          <p className={`percent ${parseFloat(indices.nifty.change) >= 0 ? 'up' : 'down'}`}>
            {indices.nifty.change}%
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{indices.sensex.value.toFixed(2)}</p>
          <p className={`percent ${parseFloat(indices.sensex.change) >= 0 ? 'up' : 'down'}`}>
            {indices.sensex.change}%
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;