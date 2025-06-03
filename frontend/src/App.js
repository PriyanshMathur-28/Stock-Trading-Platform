import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './landing_page/signup/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/*" element={<Navigate to="http://localhost:3001" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 