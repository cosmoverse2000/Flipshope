import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar>
        <ProductDetail />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;
