import LayoutTheme from "../components/Layout/LayoutTheme";
import { useAuth } from "../context/auth";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart.jsx";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartDropdown from "../components/CartDropdown";
import ProductCard from "../components/ProductCard"; // Import ProductCard component

const ShopPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
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

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );

      if (data?.products.length === 0) {
        toast.info("No products found matching your filters");
      }

      setProducts(data?.products);
    } catch (error) {
      console.log("Error while filtering products:", error.response?.data);
      toast.error("Error filtering products");
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...product, quantity: 1 }])
    );
    console.log("Item Added to Cart", product);
    toast.success("Item Added to cart");
    toggleCartVisibility();
  };

  const toggleCartVisibility = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <LayoutTheme title={"Home"}>
      <div className='container-fluid row mt-3'>
        <div className='col-md-2'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className='d-flex flex-column mt-4'>
            <button
              className='btn btn-danger'
              onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          {products.length === 0 && (
            <p className='text-center'>No products found</p>
          )}
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div className='card m-2' style={{ width: "18rem" }} key={p._id}>
                <ProductCard
                  imageSrc={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${p._id}`}
                  productName={p.name}
                  productCategory={p.category.name}
                  originalPrice={p.price}
                  discountedPrice={p.discountedPrice}
                  availableQuantity={p.quantity}
                  productSlug={p.slug}
                  showCategory={true}
                  showPrice={true}
                />
              </div>
            ))}
          </div>

          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button
                className='btn btn-warning'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>

      <CartDropdown
        isCartOpen={isCartOpen}
        toggleCartVisibility={toggleCartVisibility}
      />
    </LayoutTheme>
  );
};

export default ShopPage;
