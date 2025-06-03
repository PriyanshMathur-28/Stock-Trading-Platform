import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats'; // Update this based on the correct location
import Pricing from './Pricings'; 
import Education from './Education';
import OpenAccount from '../OpenAccount';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
function HomePage() {
    return ( 
        <>
            {/* <Navbar/> */}
            <Hero />
            <Awards />
            <Stats />
            <Pricing/>
            <Education />
            <OpenAccount />
            {/* <Footer /> */}
        </>
    );
}

export default HomePage;
