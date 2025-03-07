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
  const [radio, setRadio] = useState([]); // state for price filter
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State to control filter visibility (on mobile)

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

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);

    if (window.innerWidth <= 768) {
      setShowFilters(false);
    }
  };

  const handlePriceFilter = (value) => {
    const selectedRange = Prices.find((price) => price._id === value);
    if (selectedRange) {
      setRadio(selectedRange.array);
    }

    if (window.innerWidth <= 768) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  return (
    <LayoutTheme title={"Shop"}>
      <div className='container-fluid row mt-4'>
        <div className='col-12 d-md-none text-center mb-3'>
          <button
            className='btn search-button'
            onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div
          className={`col-md-3 col-lg-2 mt-3 ${
            showFilters ? "" : "d-none d-md-block"
          }`}
          style={{ display: showFilters ? "block" : "none" }}>
          <div className='d-md-block'>
            <h5 className='text-center mb-2'>Filter By Category</h5>
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

          <div className='d-md-block mt-5'>
            <h5 className='text-center mb-2'>Filter By Price</h5>
            <div className='d-flex flex-column'>
              <Radio.Group onChange={(e) => handlePriceFilter(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p._id}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className='col-md-9 col-lg-10'>
          <h1 className='text-center mt-2'>All Products</h1>

          <ProductList limit={2} filters={{ checked, radio }} />
        </div>
      </div>

      {isCartOpen && <CartDropdown isCartOpen={isCartOpen} />}
    </LayoutTheme>
  );
};

export default ShopPage;
