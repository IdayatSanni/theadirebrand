import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from "mdb-react-ui-kit"; // Import the required components

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
}) => {
  return (
    <MDBCard>
      <div className="d-flex justify-content-between p-3">
        <p className="lead mb-0">{comboOfferText}</p>
        <div
          className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
          style={{ width: "35px", height: "35px" }}
        >
          <p className="text-white mb-0 small">{comboOfferCount}</p>
        </div>
      </div>
      <MDBCardImage src={imageSrc} position="top" alt={productName} />
      <MDBCardBody>
        <div className="d-flex justify-content-between">
          <p className="small">
            <a href="#!" className="text-muted">
              {productCategory}
            </a>
          </p>
          <p className="small text-danger">
            <s>${originalPrice}</s>
          </p>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <h5 className="mb-0">{productName}</h5>
          <h5 className="text-dark mb-0">${discountedPrice}</h5>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <p className="text-muted mb-0">
            Available: <span className="fw-bold">{availableQuantity}</span>
          </p>
          <div className="ms-auto text-warning">
            {[...Array(5)].map((_, index) => (
              <MDBIcon
                key={index}
                fas
                icon="star"
                className={index < rating ? "text-warning" : "text-muted"}
              />
            ))}
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProductCard;
