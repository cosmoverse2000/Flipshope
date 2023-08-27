import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUserToken);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else {
    return children;
  }
};

export default Protected;
