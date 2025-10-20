import React from "react";
import { Link } from "react-router-dom"; // Added for SPA navigation

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      <Hero />
      
      {/* Kite - LeftSection */}
      <LeftSection 
        imageUrl="/media/images/kite.png" 
        productName="Kite" 
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo="https://kite.trade/demo" 
        learnMore="https://zerodha.com/kite" 
        googlePlay="https://play.google.com/store/apps/details?id=com.zerodha.kite" 
        appStore="https://apps.apple.com/app/kite-by-zerodha/id997895278" 
      />
      
      {/* Console - RightSection */}
      <RightSection 
        imageUrl="/media/images/console.png" 
        productName="Console" 
        productDescription="The central dashboard for your Bullzaar account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnMore="https://zerodha.com/console" 
      />
      
      {/* Coin - LeftSection */}
      <LeftSection 
        imageUrl="/media/images/coin.png" 
        productName="Coin" 
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo="https://coin.byzerodha.com/" 
        learnMore="https://zerodha.com/coin" 
        googlePlay="https://play.google.com/store/apps/details?id=com.zerodha.coin" 
        appStore="https://apps.apple.com/app/coin-by-zerodha/id1459152900" 
      />
      
      {/* Kite Connect API - RightSection */}
      <RightSection 
        imageUrl="/media/images/kiteconnect.png" 
        productName="Kite Connect API" 
        productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        learnMore="https://kite.trade/docs/connect/v3/" 
      />
      
      {/* Varsity Mobile - LeftSection */}
      <LeftSection 
        imageUrl="/media/images/varsity.png" 
        productName="Varsity Mobile" 
        productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo="" 
        learnMore="https://zerodha.com/varsity" 
        googlePlay="https://play.google.com/store/apps/details?id=com.zerodha.varsity" 
        appStore="https://apps.apple.com/app/varsity-by-zerodha/id1459152900" 
      />
      
      {/* Tech Stack CTA - Responsive */}
      <div className="container-fluid px-4 px-lg-5 py-5 text-center bg-light">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <p className="fs-4 lh-lg mb-4 text-muted">
              Want to know more about our technology stack? Check out the{" "}
              <Link 
                to="/blog" 
                className="text-decoration-none fw-bold"
                style={{ color: "#387ed1" }}
              >
                Bullzaar.tech
              </Link>{" "}
              blog.
            </p>
            <Link 
              to="/blog" 
              className="btn btn-primary btn-lg px-5 py-3 rounded-pill fs-5 shadow-lg"
              style={{ fontWeight: "600" }}
            >
              <i className="fas fa-blog me-2"></i>
              Explore Blog
            </Link>
          </div>
        </div>
      </div>
      
      <Universe />
    </>
  );
}

export default ProductsPage;