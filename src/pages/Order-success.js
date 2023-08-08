import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import { resetCurrentOrder } from "../features/orders/orderSlice";
import { resetCartItemsAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";

const OrderSuccess = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    //to empty cart after order succes
    dispatch(resetCartItemsAsync(user.id));
    // to empty current order so that oders succes cannot be reached again
    dispatch(resetCurrentOrder());
  }, [dispatch, user.id]);

  return (
    <div>
      {!params.orderId && <Navigate to={`/`} replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Success!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Placed #{params?.orderId}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            ThankYou ! For being our valuable customer.
            <br />
            To check your orders Status go to My profile {"->"} My Orders
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
  );
};

export default OrderSuccess;
