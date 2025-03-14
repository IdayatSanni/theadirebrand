import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div
      id='intro-example'
      className='p-5 bg-image'
      style={{
        backgroundImage: "url(./images/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className='h-100 d-flex justify-content-start align-items-center'>
        <div className='text-left text-white move-text'>
          <h5 className='mb-2 text-muted'>Materials/ Dresses/Tops</h5>
          <h1 className='mb-3 display-1 text-black'>Wear Color</h1>
          <Link to='/shopall'>
            <button
              size='lg'
              className='m-2 btn search-button px-5'
              href='/shopall'
              target='_self'>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
