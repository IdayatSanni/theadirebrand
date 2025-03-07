import React, { useState, useEffect } from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "axios";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("payment_on_delivery");
  const [address, setAddress] = useState(auth.user?.address || "");
  const [addressName, setAddressName] = useState(auth.user?.name || "");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "NGN",
      });
  };

  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setAddressName(e.target.value);
  };

  const handleGuestNameChange = (e) => {
    setGuestName(e.target.value);
  };

  const handleGuestEmailChange = (e) => {
    setGuestEmail(e.target.value);
  };

  const handleGuestAddressChange = (e) => {
    setGuestAddress(e.target.value);
  };

  console.log("Auth User:", auth.user);
  console.log("Auth Token:", auth.token);

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const orderData = {
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          slug: item.slug,
        })),
        buyer: auth.user ? auth.user._id : null,
        payment: paymentMethod,
        address: address,
        guestName: !auth.user ? guestName : undefined,
        guestEmail: !auth.user ? guestEmail : undefined,
        guestAddress: !auth.user ? guestAddress : undefined,
      };

      const config = {
        headers: {},
      };

      // Only add Authorization header if the user is authenticated
      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/create-order`,
        orderData,
        config // Pass the config with the token header
      );

      console.log("Order data being sent:", orderData); // Logging order data

      if (response.data.success) {
        console.log("Order placed successfully", response.data.order);
        clearCart();

        navigate(`/order/${response.data.order._id}`, {
          state: { order: response.data.order },
        });
      } else {
        console.error("Error placing the order");
      }
    } catch (error) {
      console.error("Error placing the order: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutTheme title={"Cart Page"}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'> Shopping Cart </h1>
            <h4 className='text-center'>
              {cart.length
                ? `You have ${cart.length} items in your cart.`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8'>
            {cart.map((p) => (
              <div className='row mb-2 p-3 card flex-row' key={p._id}>
                <div className='col-md-4'>
                  <img
                    src={`${
                      import.meta.env.VITE_API
                    }/api/v1/product/product-photo/${p._id}`}
                    className='card-img-top'
                    alt={p.name}
                    width='100px'
                    height={"100px"}
                  />
                </div>
                <div className='col-md-8'>
                  <p>{p.name}</p>
                  <p>Price: ₦{p.price}</p>
                  <p>Quantity: {p.quantity}</p>
                  <div>
                    <button
                      className='btn btn-sm btn-primary'
                      onClick={() => handleIncreaseQuantity(p._id)}>
                      +
                    </button>
                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => handleDecreaseQuantity(p._id)}>
                      -
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleRemoveFromCart(p._id)}>
                      Remove from cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <hr />
            <h4>Total: {totalPrice()}</h4>

            <div className='mt-4'>
              <label htmlFor='paymentMethod' className='form-label'>
                Select Payment Method
              </label>
              <select
                id='paymentMethod'
                className='form-select'
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value='payment_on_delivery'>Payment on Delivery</option>
              </select>
            </div>
            <div className='mt-4'>
              <label htmlFor='name' className='form-label'>
                Full Name
              </label>
              {auth.user ? (
                <h4>{auth.user?.name}</h4>
              ) : (
                <input
                  id='full-name'
                  className='form-control'
                  placeholder='Enter your name'
                  value={guestName}
                  onChange={handleGuestNameChange}
                />
              )}
            </div>
            <div className='mt-4'>
              <label htmlFor='email' className='form-label'>
                Email Address
              </label>
              {auth.user ? (
                <h4>{auth.user?.email}</h4>
              ) : (
                <input
                  id='email'
                  className='form-control'
                  placeholder='Enter your email'
                  value={guestEmail} 
                  onChange={handleGuestEmailChange} 
                />
              )}
            </div>
            <div className='mt-4'>
              <label htmlFor='address' className='form-label'>
                Shipping Address
              </label>
              {auth.user ? (
                <h4>{auth.user?.address}</h4>
              ) : (
                <textarea
                  id='address'
                  className='form-control'
                  placeholder='Enter your address'
                  value={guestAddress} 
                  onChange={handleGuestAddressChange} 
                />
              )}
            </div>

            <div>
              <button
                className='btn btn-primary'
                onClick={handlePlaceOrder}
                disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default CartPage;
