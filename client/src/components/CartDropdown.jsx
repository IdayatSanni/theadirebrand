import React from "react";

const CartDropdown = () => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span className='empty-message'> Your cart is empty </span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          toggleHidden();
        }}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
