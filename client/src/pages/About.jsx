import React from "react";
import LayoutTheme from "../components/Layout/LayoutTheme";

const About = () => {
  return (
    <LayoutTheme title={"About us"}>
      <div className='container'>
        <h1 className='text-center my-4'>About Us</h1>
        <div className='row m-3'>
          <div className='col-md-6 col-12 d-flex justify-content-center'>
            <img
              src='/images/theadirebrand.JPG'
              className='img-fluid rounded'
              alt='aboutus'
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "300px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className='col-md-6 col-12 d-flex align-items-start'>
            <p className='text-justify mt-2'>
              At The Adire Brand, we specialize in creating high-quality,
              vibrant, and unique tie and dye designs that make a statement. Our
              products are carefully crafted to bring bold colors, intricate
              patterns, and artistic expressions into your wardrobe. Whether
              you're looking for something casual, chic, or elegant, we offer a
              range of ready-to-wear clothing that caters to all styles. <br />
              Our commitment to craftsmanship ensures that each item is made
              with precision and care, using only the finest materials. From
              vibrant shirts to stylish dresses, each piece is a work of art
              designed to turn heads and add personality to your everyday look.
              We are passionate about bringing you the beauty of
              African-inspired tie and dye into modern, wearable fashion.
            </p>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default About;
