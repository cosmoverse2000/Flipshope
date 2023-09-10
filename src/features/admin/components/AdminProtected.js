import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserProfile } from "../../user/userSlice";
import { selectLoggedInUserToken } from "../../auth/authSlice";

const AdminProtected = ({ children }) => {
  const userProfile = useSelector(selectUserProfile);
  const userToken = useSelector(selectLoggedInUserToken);
  if (!userToken) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else if (userProfile && userProfile.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  } else {
    return children;
  }
};

export default AdminProtected;
