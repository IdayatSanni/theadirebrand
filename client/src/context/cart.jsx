import React, { createContext, useContext, useState, useEffect } from "react";

// Creating the CartContext to provide the cart data and functions to the app
const CartContext = createContext();

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);

// CartProvider to wrap your components and provide cart functionality
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // This manages the cart visibility toggle state

  // Load cart data from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart data to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Toggle the cart dropdown visibility
  const toggleCartVisibility = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 } // Increase the quantity if the item already exists
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Add new product to cart with quantity 1
      }
    });
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 }; // Increase quantity by 1
      }
      return item;
    });
    setCart(updatedCart); // Update cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "NGN",
      });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isCartOpen,
        toggleCartVisibility, // Expose toggleCartVisibility function
        totalPrice, // Expose total price function
      }}>
      {children}
    </CartContext.Provider>
  );
};
