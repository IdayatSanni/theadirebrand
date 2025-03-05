import React, { useState, useEffect, createContext, useContext } from "react";

// Create CartContext
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);

  const toggleCartVisibility = () => {
    setIsCartOpen(!isCartOpen);
    console.log("Toggling cart visibility:", !prev);
    return !prev;
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, isCartOpen, toggleCartVisibility }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
