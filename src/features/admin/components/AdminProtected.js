import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserProfile } from "../../user/userSlice";

const AdminProtected = ({ children }) => {
  const userProfile = useSelector(selectUserProfile);
  if (!userProfile) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else if (userProfile && userProfile.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  } else {
    return children;
  }
};

export default AdminProtected;
