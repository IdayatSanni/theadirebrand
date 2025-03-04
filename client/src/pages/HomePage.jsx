import LayoutTheme from "../components/Layout/LayoutTheme";
import { Button, Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingBestsellers, setLoadingBestsellers] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setTotal(data.total);
      setProducts(data.products.slice(0, 3));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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

  useEffect(() => {
    getAllProducts();
    getBestsellers();
  }, []);

  return (
    <LayoutTheme title={"Home"}>
      <Container className='my-5'>
        <h4 className='text-center mt-4'>Featured Products</h4>
        <Row>
          {products?.map((p) => (
            <Col lg={4} key={p._id} className='mb-4'>
              <div className='card' style={{ width: "18rem" }}>
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
                  <p className='card-text'> ₦ {p.price}</p>
                  <Button
                    variant='primary'
                    onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <h4 className='text-center mt-4'>Bestsellers</h4>
        {loadingBestsellers ? (
          <div className='text-center'>Loading Bestsellers...</div>
        ) : (
          <Row>
            {bestsellers?.map((p) => (
              <Col lg={4} key={p._id} className='mb-4'>
                <div className='card' style={{ width: "18rem" }}>
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
                    <p className='card-text'> ₦ {p.price}</p>
                    <span className='badge bg-warning text-dark'>
                      Bestseller
                    </span>
                    <Button
                      variant='primary'
                      onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        <div className='m-2 p-3'>
          {products && products.length < total && (
            <Button
              variant='warning'
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
              {loading ? "Loading ..." : "Load More"}
            </Button>
          )}
        </div>
      </Container>
    </LayoutTheme>
  );
};

export default HomePage;
