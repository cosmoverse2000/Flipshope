import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../../auth/authSlice";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectLoggedInUserToken);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  } else {
    return children;
  }
};

export default AdminProtected;
