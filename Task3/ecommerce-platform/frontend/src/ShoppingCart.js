import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(total);
  }, [cartItems]);

  const handleCheckout = () => {
    alert('Checkout successful!');
    setCartItems([]);
    navigate('/');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default ShoppingCart;
