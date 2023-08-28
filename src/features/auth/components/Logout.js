import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAccountAsync, selectLoggedInUserToken } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    if (userToken) {
      dispatch(logoutUserAccountAsync());
    }
  }, [dispatch, userToken]);

  return <>{!userToken && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default Logout;
