import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";
import Footer from "../features/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar>
        <UserProfile />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;
