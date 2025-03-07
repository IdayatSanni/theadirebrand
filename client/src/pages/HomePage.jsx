import React, { useState, useEffect } from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // Import ProductCard
import Hero from "../components/Hero";

const HomePage = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBestsellers = async () => {
    try {
      setLoadingBestsellers(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/bestsellers`
      );
      setBestsellers(data.products);
      setLoadingBestsellers(false);
    } catch (error) {
      setLoadingBestsellers(false);
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getBestsellers();
    getProducts();
  }, []);

  return (
    <LayoutTheme title={"Home"}>
      <Hero />
      <Container className='my-5 container'>
        <h4 className='text-center mt-4'>Featured Products</h4>
        {loading ? (
          <div className='text-center'>Loading Products...</div>
        ) : (
          <Row>
            {products?.slice(0, 3).map((p) => (
              <div key={p._id} className='col-lg-4 mb-4'>
                <ProductCard
                  _id={p._id}
                  imageSrc={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${p._id}`}
                  productName={p.name}
                  productCategory={p.category}
                  originalPrice={p.price}
                  productSlug={p.slug}
                  productQuantity={p.quantity}
                  showCategory={false}
                  showPrice={false}
                  showAddToView={false}
                  showAddToCartButton={false}
                />
              </div>
            ))}
          </Row>
        )}

        <h4 className='text-center mt-4'>Bestsellers</h4>
        {loadingBestsellers ? (
          <div className='text-center'>Loading Bestsellers...</div>
        ) : (
          <Row>
            {bestsellers?.slice(0, 3).map((p) => (
              <div key={p._id} className='col-lg-4 mb-1'>
                <ProductCard
                  _id={p._id}
                  imageSrc={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${p._id}`}
                  productName={p.name}
                  productCategory={p.category}
                  originalPrice={p.price}
                  productSlug={p.slug}
                  productQuantity={p.quantity}
                  showCategory={false}
                  showPrice={true}
                />
              </div>
            ))}
          </Row>
        )}
      </Container>
    </LayoutTheme>
  );
};

export default HomePage;
