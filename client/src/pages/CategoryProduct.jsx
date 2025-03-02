import React, { useState, useEffect } from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      console.log("Fetching products for category:", params.slug);
      getProductsByCat();
    }
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API
      }/api/v1/product/product-category/${params.slug}`;
      console.log("Request URL:", url); // Log the request URL
      const { data } = await axios.get(url);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log("Error response:", error.response); // Log full error response
      if (error.response) {
        // The request was made, but the server responded with a status code outside of the range 2xx
        console.log("Response Status:", error.response.status); // Status code
        console.log("Response Data:", error.response.data); // Error message from server
        console.log("Response Headers:", error.response.headers); // Headers from the server
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("Request error:", error.request);
      } else {
        // Something else happened in setting up the request
        console.log("Error message:", error.message);
      }
    }
  };

  return (
    <LayoutTheme>
      <div className='container mt-3'>
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>
          {products?.length} {products?.length === 1 ? "result" : "results"}{" "}
          found
        </h6>
        <div className='row'>
          <div className='col-md-9 offset-1'>
            <div className='d-flex flex-wrap'>
              {products?.length > 0 ? (
                products.map((p) => (
                  <div
                    className='card m-2'
                    style={{ width: "18rem" }}
                    key={p._id}>
                    <img
                      src={`${
                        import.meta.env.VITE_API
                      }/api/v1/product/product-photo/${p._id}`}
                      className='card-img-top'
                      alt={p.name}
                    />
                    <div className='card-body'>
                      <h5 className='card-title'>{p.name}</h5>
                      <p className='card-text'>
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className='card-text'> ${p.price}</p>
                      <button
                        className='btn btn-primary ms-1'
                        onClick={() => navigate(`/product/${p.slug}`)}>
                        More Details
                      </button>
                      <button className='btn btn-secondary ms-1'>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found in this category</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default CategoryProduct;
