import React from "react";
// import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mb-5 flex-row">
        <h1 className="text-center ">
          People
        </h1>
      </div>

      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5 ">
          <img
            src="media/nithinKamath.jpg"
            style={{ borderRadius: "100%", width: "60%" }}
            class="img-fluid rounded-top"
            alt=""
          />
          
        </div>
        <div className="col-6 p-5 mt-5 border-top text-muted fs-6">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a href="/" style={{ textDecoration: "none" }}>
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
