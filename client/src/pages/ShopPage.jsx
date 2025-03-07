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

  
  const handlePriceFilter = (value) => {
    

    
    const selectedRange = Prices.find((price) => price._id === value);
    if (selectedRange) {
      setRadio(selectedRange.array); 
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  return (
    <LayoutTheme title={"Shop"}>
      
      <div className='container-fluid row mt-3'>
        
        <div className='col-md-3 col-lg-2'>
          
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

          
          <div className='d-md-block d-none mt-5'>
            <h4 className='text-center mb-4'>Filter By Price</h4>
            <div className='d-flex flex-column'>
              <Radio.Group onChange={(e) => handlePriceFilter(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p._id}>{p.name}</Radio> {/* Use p._id */}
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        
        <div className='col-md-9 col-lg-10'>
          <h1 className='text-center mb-5'>All Products</h1>
          
          <ProductList
            limit={2}
            filters={{ checked, radio }} 
          />
        </div>
      </div>

      
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
