import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/CartSlice';
import { plantsArray } from './plantsData';
import Navbar from '../Navbar';
import CartItem from '../CartItem/CartItem';
import './ProductList.css';
function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const dispatch = useDispatch();

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.name]: true }));
  };

  const goHome = () => onHomeClick();
  const goToPlants = () => setShowCart(false);
  const goToCart = () => setShowCart(true);

  if (showCart) {
    return <CartItem onHomeClick={goHome} onPlantsClick={goToPlants} onContinueShopping={goToPlants} />;
  }

  return (
    <div className="product-list-page">
      <Navbar page="plants" onHomeClick={goHome} onPlantsClick={goToPlants} onCartClick={goToCart} />

      <div className="product-list-container">
        {plantsArray.map((category) => (
          <div className="category-section" key={category.category}>
            <h2 className="category-title">{category.category}</h2>
            <div className="plants-grid">
              {category.plants.map((plant) => (
                <div className="plant-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-cost">{plant.cost}</p>
                  <button
                    className="add-to-cart-button"
                    disabled={!!addedItems[plant.name]}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {addedItems[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
