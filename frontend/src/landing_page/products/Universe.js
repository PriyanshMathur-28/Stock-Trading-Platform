import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/smallcaseLogo.png" alt=""/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/streakLogo.png" alt="" height="100px" width="200px"/>
          <p className="text-small text-muted">Algo & strategy  platform</p>
        </div>
        <br></br>
        <div className="col-4 p-3 mt-5">
          <img src="media/sensibullLogo.svg" alt="" height="100px" width="200px"/>
          <p className="text-small text-muted">options trading  platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/zerodhaFundHouse.png" alt="" height="100px" width="200px"/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/goldenpiLogo.png" alt="" height="100px" width="200px"/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/dittoLogo.png" alt="" height="100px" width="200px"/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
