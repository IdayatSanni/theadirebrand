import React, { useState, useEffect, createContext, useContext } from "react";

// Create context for cart
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // On initial load, check if there's a cart in localStorage
  useEffect(() => {
    const existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);

  // Toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Add item to the cart
  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toggleCartVisibility(); // Show cart after adding item
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, isCartOpen, toggleCartVisibility }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
