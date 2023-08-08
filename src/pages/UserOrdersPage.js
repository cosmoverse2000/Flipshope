import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

const Home = () => {
  return (
    <Navbar>
      <UserOrders />
    </Navbar>
  );
};

export default Home;
