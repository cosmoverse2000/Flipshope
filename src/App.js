import React, { useEffect } from "react";
import "./App.css";
import { Grid } from "react-loader-spinner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
//pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import ErrorPage from "./pages/404";
import ForgotPage from "./pages/ForgotPage";
import OrderSuccess from "./pages/Order-success";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
//compo
import Protected from "./features/auth/components/Protected";
import AdminProtected from "./features/admin/components/AdminProtected";
import Logout from "./features/auth/components/Logout";
//redux slice
import { fetchCartByUserIdAsync } from "./features/cart/cartSlice";
import {
  checkUserTokenExistsAsync,
  selectLoggedInUserToken,
  selectUserCheckLoadingStatus,
} from "./features/auth/authSlice";
import { fetchUserProfileAsync } from "./features/user/userSlice";
import StripePaymentPage from "./pages/StripePaymentPage";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/user-cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/order-success/:orderId",
    element: (
      <Protected>
        <OrderSuccess />
      </Protected>
    ),
  },
  {
    path: "/user-orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/user-profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/stripe-payment",
    element: (
      <Protected>
        <StripePaymentPage />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/edit/:prodId",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage />
      </AdminProtected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot",
    element: <ForgotPage />,
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedInUserToken);
  const userCheckLoadingStatus = useSelector(selectUserCheckLoadingStatus);

  //checkng if user exits in backend's session and is valid authorize client wo/ login|signp
  // this will make app to not loose data on reload
  useEffect(() => {
    dispatch(checkUserTokenExistsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchCartByUserIdAsync());
      dispatch(fetchUserProfileAsync());
    }
  }, [dispatch, userToken]);

  return (
    <>
      {userCheckLoadingStatus ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229)"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="my-24 justify-center"
          visible={true}
        />
      ) : (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </>
  );
}
