import React, { useState, useEffect } from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth"; // Using your AuthContext
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const [auth] = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("payment_on_delivery");
  const [address, setAddress] = useState(auth.user?.address || "");

  const totalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "NGN",
      });
  };

  const handleIncreaseQuantity = (id) => {
    console.log("Increase button clicked for product ID:", id);
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    console.log("Decrease button clicked for product ID:", id);
    decreaseQuantity(id);
  };

  const handleRemoveFromCart = (id) => {
    console.log("Remove button clicked for product ID:", id);
    removeFromCart(id);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
              <label htmlFor='address' className='form-label'>
                Full Name
              </label>
              {auth.user ? (
                <h4>{auth.user?.name}</h4>
              ) : (
                <textarea
                  id='full-name'
                  className='form-control'
                  placeholder='Enter your name'
                  value={address}
                  onChange={handleAddressChange}
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
                  value={address}
                  onChange={handleAddressChange}
                />
              )}
            </div>

            <div>
              <h3>Place Order</h3>
            </div>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default CartPage;
