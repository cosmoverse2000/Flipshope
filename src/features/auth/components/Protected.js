import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";

const Protected = ({ children }) => {
  const userToken = useSelector(selectLoggedInUserToken);
  if (!userToken) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else {
    return children;
  }
};

export default Protected;
