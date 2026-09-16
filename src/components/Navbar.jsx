import React from 'react';
import { useSelector } from 'react-redux';
function Navbar({ page, onHomeClick, onPlantsClick, onCartClick }) {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={onHomeClick}>
         Paradise Nursery
      </div>
      <div className="nav-links">
        <span className={page === 'home' ? 'active' : ''} onClick={onHomeClick}>
          Home
        </span>
        <span className={page === 'plants' ? 'active' : ''} onClick={onPlantsClick}>
          Plants
        </span>
        <span className={`cart-link ${page === 'cart' ? 'active' : ''}`} onClick={onCartClick}>
          Cart
          <span className="cart-count">{totalItems}</span>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
