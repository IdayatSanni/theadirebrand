import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductCard = ({
  _id,
  imageSrc,
  productName,
  productCategory,
  originalPrice,
  productSlug,
  productQuantity,
  showCategory = true,
  showPrice = true,
  showAddToCartButton = true,
  showAddToView = true,
}) => {
  const { cart, addToCart, toggleCartVisibility } = useCart();

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item._id === _id);
    const existingQuantity = existingProduct ? existingProduct.quantity : 0;

    if (existingQuantity >= productQuantity) {
      toast.error(
        `Sorry, only ${productQuantity} items of this product are available.`
      );
      return;
    }

    const product = {
      _id,
      slug: productSlug,
      name: productName,
      price: originalPrice,
      image: imageSrc,
      quantity: 1,
    };

    addToCart(product);

    toast.success(`${productName} added to cart`);

    toggleCartVisibility();
  };

  return (
    <MDBCard
      style={{ width: "350px" }}
      className='d-flex flex-column align-items-center'>
      <Link to={`/product/${productSlug}`}>
        <MDBCardImage
          src={imageSrc}
          position='top'
          className='img-fluid pt-3'
          alt={productName}
          style={{ width: "350px", height: "180px" }}
        />
      </Link>
      <MDBCardBody
        className='d-flex flex-column align-items-center'
        style={{ width: "270px" }}>
        {showCategory && productCategory && (
          <div className='d-flex justify-content-between w-100'>
            <p className='small'>{productCategory}</p>
          </div>
        )}

        <div className='d-flex justify-content-between w-100 mb-3'>
          <h5 className='mb-0'>{productName}</h5>
          {showPrice && (
            <h5 className='text-dark mb-0'>{`₦${originalPrice}`}</h5>
          )}
        </div>

        <div className='d-flex justify-content-between w-100'>
          {showAddToView && (
            <Link
              to={`/product/${productSlug}`}
              className='btn search-button ms-1'>
              View
            </Link>
          )}
          {showAddToCartButton && (
            <button
              className='btn ms-1 search-button'
              onClick={handleAddToCart}
              disabled={productQuantity <= 0}>
              {productQuantity <= 0 ? "SOLD OUT" : "ADD TO CART"}
            </button>
          )}
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProductCard;
