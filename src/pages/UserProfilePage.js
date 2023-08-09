import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const Home = () => {
  return (
    <Navbar>
      <UserProfile />
    </Navbar>
  );
};

export default Home;
