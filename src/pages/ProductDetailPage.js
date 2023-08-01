import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";

const Home = () => {
  return (
    <Navbar>
      <ProductDetail />
    </Navbar>
  );
};

export default Home;
