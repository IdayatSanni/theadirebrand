import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartDropdown from "../components/CartDropdown";
import ProductList from "../components/ProductList";
import LayoutTheme from "../components/Layout/LayoutTheme";

const ShopPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Triggered when a category checkbox is clicked
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Triggered when a price radio button is selected
  const handlePriceFilter = (value) => {
    console.log("Selected Price Range:", value);
    setRadio(value);
  };

  // Toggle visibility of the cart dropdown
  const toggleCartVisibility = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  return (
    <LayoutTheme title={"Shop"}>
      {/* Main container with layout */}
      <div className='container-fluid row mt-3'>
        {/* Sidebar for filters */}
        <div className='col-md-3 col-lg-2'>
          {/* Category filter */}
          <div className='d-md-block d-none'>
            <h4 className='text-center mb-4'>Filter By Category</h4>
            <div className='d-flex flex-column'>
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className='d-md-block d-none mt-5'>
            <h4 className='text-center mb-4'>Filter By Price</h4>
            <div className='d-flex flex-column'>
              <Radio.Group onChange={(e) => handlePriceFilter(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className='col-md-9 col-lg-10'>
          <h1 className='text-center mb-5'>All Products</h1>
          {/* Pass the selected filters to the ProductList component */}
          <ProductList
            limit={2}
            filters={{ checked, radio }} // Filters passed here
          />
        </div>
      </div>

      {/* Cart dropdown toggle */}
      {isCartOpen && (
        <CartDropdown
          isCartOpen={isCartOpen}
          toggleCartVisibility={toggleCartVisibility}
        />
      )}
    </LayoutTheme>
  );
};

export default ShopPage;
