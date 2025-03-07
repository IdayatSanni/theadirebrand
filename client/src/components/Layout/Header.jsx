import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { cart } = useCart();

  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <Navbar className='navbar-bg'>
        <Container fluid className='container'>
          <div className='d-flex justify-content-between w-100'>
            <div className='price d-none d-lg-block'>NGN</div>

            <div className='d-lg-block text-center free-shipping-text'>
              Free shipping for orders above 50,0000
            </div>

            <div className='d-lg-block '>
              {!auth?.user ? (
                <div className='d-flex justify-content-between gap-2'>
                  <Nav.Link
                    as={Link}
                    to='/register'
                    className='nav-link-custom'>
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to='/login' className='nav-link-custom'>
                    Login
                  </Nav.Link>
                </div>
              ) : (
                <NavDropdown
                  title={`Welcome ${auth?.user?.name}`}
                  id='offcanvasNavbarDropdown-auth'>
                  <NavDropdown.Item
                    as={Link}
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to='/login'
                    onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </div>
        </Container>
      </Navbar>

      <Navbar expand='lg' className='navbar-btm'>
        <Container fluid className='container'>
          <Navbar.Toggle aria-controls='offcanvasNavbar'>
            <HiOutlineBars3 />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
            placement='start'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id='offcanvasNavbarLabel'>
                TheAdireBrand
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-start flex-grow-1'>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/about'>
                  About us
                </Nav.Link>
                <Nav.Link as={Link} to={`/category/adire`}>
                  Adire
                </Nav.Link>
                <Nav.Link as={Link} to={`/category/bibani`}>
                  Bibani
                </Nav.Link>

                <Nav.Link as={Link} to='/shopall'>
                  Shop All
                </Nav.Link>
                <SearchInput />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand as={Link} to='/'>
            TheAdireBrand
          </Navbar.Brand>
          <div>
            <Badge count={cart?.length} showZero>
              <Nav.Link as={Link} to='/cart'>
                Cart
              </Nav.Link>
            </Badge>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
