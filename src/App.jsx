import React, { useState } from 'react';
import AboutUs from './components/AboutUs/AboutUs';
import ProductList from './components/ProductList/ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStartedClick = () => {
    setShowProducts(true);
  };

  const handleHomeClick = () => {
    setShowProducts(false);
  };

  if (showProducts) {
    return <ProductList onHomeClick={handleHomeClick} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <AboutUs />
        <button className="get-started-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
