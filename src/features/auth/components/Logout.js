import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAccountAsync, selectLoggedInUserToken } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    if (user) {
      dispatch(logoutUserAccountAsync(user.id));
    }
  }, [dispatch, user]);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default Logout;
