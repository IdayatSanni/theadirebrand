import React from "react";
import { useState } from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();

  const [paymentOption, setPaymentOption] = useState("delivery");
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "NGN",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    console.log(`Checkout with ${paymentOption} payment option`);
    navigate("/orders");
  };
  return (
    <LayoutTheme title={"cart page"}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {cart?.map((p) => (
              <div className='row mb-2 p-3 card flex-row'>
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
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeCartItem(p._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className='mb-3'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className='btn btn-outline-warning'
                    onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                {auth?.token ? (
                  <button
                    className='btn btn-outline-warning'
                    onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </button>
                ) : (
                  <button
                    className='btn btn-outline-warning'
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }>
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='mt-3'>
            <h4>Payment Option</h4>
            <select
              className='form-select'
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}>
              <option value='delivery'>Payment on Delivery</option>
              <option value='online'>Online Payment</option>
            </select>
          </div>

          <div className='mt-4'>
            {auth?.token && cart?.length > 0 ? (
              <button className='btn btn-success' onClick={handleCheckout}>
                Complete Checkout
              </button>
            ) : (
              <button className='btn btn-danger' disabled>
                Complete Checkout (Login Required)
              </button>
            )}
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default CartPage;
