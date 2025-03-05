import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductCard = ({
  _id,
  imageSrc,
  productName,
  productCategory,
  originalPrice,
  discountedPrice,
  productSlug,
  productQuantity,
  showCategory = true,
  showPrice = true,
}) => {
  console.log("_id in ProductCard:", _id);

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
      price: discountedPrice || originalPrice,
      image: imageSrc,
      quantity: 1,
    };

    console.log("Product to add to cart:", product);

    // Add the product to cart (or increment its quantity if it already exists)
    addToCart(product);

    toast.success(`${productName} added to cart`);

    // Open the CartDropdown when item is added
    toggleCartVisibility();
  };

  return (
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
              {discountedPrice ? `₦${discountedPrice}` : `₦${originalPrice}`}
            </h5>
          )}
        </div>
        <button
          className='btn btn-secondary ms-1 search-button'
          onClick={handleAddToCart}
          disabled={productQuantity <= 0}>
          {productQuantity <= 0 ? "SOLD OUT" : "ADD TO CART"}
        </button>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProductCard;
