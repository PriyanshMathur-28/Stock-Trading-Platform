import React, { useState, useContext } from "react"; // Add useContext
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { useAuth } from "../hooks/useAuth";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { user } = useAuth();
  const { closeBuyWindow } = useContext(GeneralContext); // Use context properly
const handleBuyClick = () => {
  axios
    .post(
      "http://localhost:3001/orders/create",
      {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      },
      {
        headers: {
          Authorization: `Bearer ${user}`,  // Add Bearer prefix
        },
      }
    )
    .then((res) => {
      closeBuyWindow();
    })
    .catch((error) => {
      console.error("Error creating order:", error);
    });
};


  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;