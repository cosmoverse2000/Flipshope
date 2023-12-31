import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import { resetCurrentOrder } from "../features/orders/orderSlice";
import { resetCartItemsAsync } from "../features/cart/cartSlice";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

const OrderSuccess = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //to empty cart after order succes
    dispatch(resetCartItemsAsync());
    // to empty current order so that oders succes cannot be reached again
    dispatch(resetCurrentOrder());
  }, [dispatch]);

  return (
    <>
      <Navbar>
        <div>
          {!params.orderId && <Navigate to={`/`} replace={true}></Navigate>}
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">
                Success!
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Order Placed
              </h1>
              <Link
                to="/user-orders"
                className="md:text-3xl text-2xl underline cursor-pointer "
              >
                ORDER ID: #{params?.orderId}
              </Link>
              <p className="mt-6 text-base leading-7 text-gray-600 overflow-hidden">
                ThankYou ! For being our valuable customer.
                <br />
                To check your orders Status go to Account{"->"}My Orders
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back, Continue Shopping
                </Link>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">
        Contact support <span aria-hidden="true">&rarr;</span>
      </a> */}
              </div>
            </div>
          </main>
        </div>
      </Navbar>
      <Footer />
    </>
  );
};

export default OrderSuccess;
