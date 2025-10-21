import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { useAuth } from "../hooks/useAuth";

const TopBar = () => {
  const [indices, setIndices] = useState({ nifty: {}, sensex: {} });
  const { user } = useAuth();

  useEffect(() => {
   axios.get("http://localhost:3001/indices", {
  headers: {
    Authorization: `Bearer ${user}`,
  },
})

      .then((res) => {
        setIndices(res.data);
      })
      .catch((error) => {
        console.error("Error fetching indices:", error);
      });
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{indices.nifty.value || "N/A"}</p>
          <p className="percent">{indices.nifty.percent || ""}</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{indices.sensex.value || "N/A"}</p>
          <p className="percent">{indices.sensex.percent || ""}</p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;