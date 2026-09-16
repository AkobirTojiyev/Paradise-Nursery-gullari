import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../redux/CartSlice';
import Navbar from '../Navbar';
import './CartItem.css';
const parsePrice = (cost) => parseFloat(cost.replace('$', ''));
function CartItem({ onHomeClick, onPlantsClick, onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const calculateTotalAmount = () =>
    cartItems
      .reduce((total, item) => total + parsePrice(item.cost) * item.quantity, 0)
      .toFixed(2);
  const calculateItemSubtotal = (item) => (parsePrice(item.cost) * item.quantity).toFixed(2);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <Navbar page="cart" onHomeClick={onHomeClick} onPlantsClick={onPlantsClick} onCartClick={() => {}} />

      <div className="cart-container">
        <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>

        {cartItems.length === 0 && <p className="empty-cart">Your cart is empty.</p>}

        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} className="cart-item-thumbnail" />

            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-unit-price">Unit Price: {item.cost}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name} quantity`}>
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name} quantity`}>
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">Subtotal: ${calculateItemSubtotal(item)}</p>
            </div>

            <button className="delete-button" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        ))}

        <div className="cart-actions">
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="continue-shopping-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
