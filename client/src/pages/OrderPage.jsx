import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import LayoutTheme from "../components/Layout/LayoutTheme";
import axios from "axios"; 
import { useAuth } from "../context/auth"; 

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth] = useAuth(); 
  const order = location.state?.order; 
  const orderId = location.pathname.split("/").pop(); 
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/auth/order/${orderId}`
        );
        setOrderDetails(response.data);

        
        const productSlugs = response.data.products.map((item) => item.slug); 
        const productDetailsPromises = productSlugs.map((slug) =>
          axios.get(
            `${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`
          )
        );
        const productResponses = await Promise.all(productDetailsPromises);
        setProducts(productResponses.map((res) => res.data.product)); 
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (!order) {
      fetchOrderDetails(); 
    } else {
      setOrderDetails(order); 
      const productSlugs = order.products.map((item) => item.slug); 
      const productDetailsPromises = productSlugs.map((slug) =>
        axios.get(
          `${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`
        )
      );
      Promise.all(productDetailsPromises).then((productResponses) => {
        setProducts(productResponses.map((res) => res.data.product)); 
      });
    }
  }, [order, orderId]);

  if (!orderDetails || products.length === 0) {
    return <div>Loading...</div>; 
  }

  console.log("OrderDetails:", orderDetails);
  console.log("Products:", products);

  
  const customerName = auth.user?.name || orderDetails.guestName || "Guest";
  const customerEmail =
    auth.user?.email || orderDetails.guestEmail || "No email provided";
  const customerAddress =
    auth.user?.address || orderDetails.guestAddress || "No address provided";

  return (
    <LayoutTheme title={"Order Summary"}>
      <div className='container'>
        <h1>Thank you for placing an order!</h1>
        <h2>Order Summary</h2>

        <div className='order-summary'>
          <div>
            <h3>Customer Details:</h3>
            <p>
              <strong>Name:</strong> {customerName}
            </p>
            <p>
              <strong>Email:</strong> {customerEmail}
            </p>
            <p>
              <strong>Shipping Address:</strong> {customerAddress}
            </p>
          </div>

          <div>
            <h3>Payment Method:</h3>
            <p>{orderDetails.payment?.method || "Not specified"}</p>
          </div>

          <div>
            <h3>Order Items:</h3>
            {orderDetails.products.map((item, index) => (
              <div key={item.slug}>
                {" "}
                
                <h5>{products[index]?.name}</h5> 
                <p>Price: ₦{products[index]?.price}</p>{" "}
                
                <p>Quantity: {item.quantity}</p> 
              </div>
            ))}
          </div>

          <div>
            <h3>Total Price:</h3>
            <p>
              ₦
              {orderDetails.products
                .reduce(
                  (total, item) =>
                    total +
                    (products.find((p) => p.slug === item.slug)?.price || 0) *
                      item.quantity,
                  0
                )
                .toLocaleString("en-US")}
            </p>
          </div>

          <div>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default OrderPage;
