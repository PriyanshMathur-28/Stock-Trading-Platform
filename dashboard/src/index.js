import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { StockProvider } from "./context/StockContext";
import { ChartProvider } from "./context/ChartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StockProvider>
        <ChartProvider>
          <App />
        </ChartProvider>
      </StockProvider>
    </BrowserRouter>
  </React.StrictMode>
);
