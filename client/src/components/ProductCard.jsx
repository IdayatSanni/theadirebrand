import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from "mdb-react-ui-kit";
import { useCart } from "../context/cart";
import { Link } from "react-router-dom";

const ProductCard = ({
  imageSrc,
  productName,
  productCategory,
  originalPrice,
  discountedPrice,
  availableQuantity,
  rating,
  comboOfferText,
  comboOfferCount,
  productSlug,
  showCategory = true,
  showPrice = true,
}) => {
  const { addToCart, isCartOpen, toggleCartVisibility, cart } = useCart();

  const handleAddToCart = () => {
    const product = {
      name: productName,
      price: discountedPrice || originalPrice,
      image: imageSrc,
      quantity: 1,
      productSlug,
    };
    addToCart(product);
  };

  return (
    <>
      <Link to={`/product/${productSlug}`} style={{ textDecoration: "none" }}>
        <MDBCard style={{ width: "300px" }}>
          <MDBCardImage
            src={imageSrc}
            position='top'
            className='img-fluid pt-3'
            alt={productName}
            style={{ width: "300px", height: "180px" }}
          />
          <MDBCardBody>
            {showCategory && (
              <div className='d-flex justify-content-between'>
                <p className='small'>{productCategory}</p>
              </div>
            )}
            <div className='d-flex justify-content-between mb-3'>
              <h5 className='mb-0'>{productName}</h5>
              {showPrice && (
                <h5 className='text-dark mb-0'>
                  {discountedPrice
                    ? `₦${discountedPrice}`
                    : `₦${originalPrice}`}
                </h5>
              )}
            </div>
            <button
              className='btn btn-secondary ms-1 search-button'
              onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </MDBCardBody>
        </MDBCard>
      </Link>
      {isCartOpen && (
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
                  data-dismiss='modal'
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
      )}
    </>
  );
};

export default ProductCard;
