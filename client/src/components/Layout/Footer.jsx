import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import useCategory from "../../hooks/useCategory";

const Footer = () => {
  const categories = useCategory();
  return (
    <div className='bg-dark text-light py-5'>
      <Container fluid className='container'>
        <Row className='text-center text-md-start'>
          <Col xs={12} md={4} className='mb-4'>
            <h4>TheAdireBrand</h4>
            <p>
              We are a ready to wear brand for fashion-forward women around the
              world. All pieces are made with ❤️ in Africa. Straight out of
              Lagos, Nigeria.
            </p>
            <div>
              <Link to='#' className='text-light me-3'>
                Facebook-f
              </Link>
              <Link to='#' className='text-light me-3'>
                Twitter
              </Link>
              <Link to='#' className='text-light'>
                Instagram
              </Link>
            </div>
            <p className='mt-3'>
              Site by{" "}
              <a
                href='https://rvo-media.com'
                className='text-light nav-link-custom'>
                Idayat Sanni
              </a>
            </p>
          </Col>

          <Col xs={12} md={4} className='d-flex flex-column mb-4'>
            {/* Quick Links */}
            <div className='mb-4'>
              <h5>QUICK LINKS</h5>
              <ul className='list-unstyled'>
                <li>
                  <Link
                    to='/shipping-returns'
                    className='text-light nav-link-custom'>
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link to='/support' className='text-light nav-link-custom'>
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5>HOT CATEGORIES</h5>
              <ul className='list-unstyled'>
                <li></li>
                <li>
                  <Link
                    to='/category/dresses'
                    className='text-light nav-link-custom'>
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link
                    to='/category/adire'
                    className='text-light nav-link-custom'>
                    Adire
                  </Link>
                </li>
                <li>
                  <Link
                    to='/category/bibani'
                    className='text-light nav-link-custom'>
                    Bibani
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={4} className='text-center'>
            <h5>Contact Info</h5>
            <p>Phone: +2348060506980</p>
            <p>theadirebrand@gmail.com</p>
            <p>
              Store open: 9:00 – 17:30, Monday – Friday, 10:00 – 17:00, Saturday
            </p>
            <p>
              Address: Plot 25, Block 72 Adebisi Popoola Crescent Off Victoria
              Arobieke, Lekki Phase 1, Lagos, Nigeria.
            </p>
          </Col>
        </Row>
      </Container>

      <div className='bg-dark text-light py-3'>
        <p className='text-center mb-0'>All Rights Reserved &copy; Idayat</p>
      </div>
    </div>
  );
};

export default Footer;
