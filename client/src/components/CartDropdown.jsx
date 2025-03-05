import React from "react";
import { useCart } from "../context/cart";

const CartDropdown = () => {
  const { cart, isCartOpen, toggleCartVisibility } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      className='modal show'
      tabIndex='-1'
      role='dialog'
      style={{ display: "block" }}>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Your Cart</h5>
            <button
              type='button'
              className='close'
              aria-label='Close'
              onClick={toggleCartVisibility}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            {cart.length ? (
              <ul className='list-group'>
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className='list-group-item d-flex justify-content-between align-items-center'>
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x ₦{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center'>Your cart is empty</p>
            )}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={toggleCartVisibility}>
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={toggleCartVisibility}>
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
