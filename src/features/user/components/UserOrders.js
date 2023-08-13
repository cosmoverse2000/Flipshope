import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserOrdersAsync,
  selectUserOrders,
  selectUserProfile,
} from "../userSlice";
import { Link } from "react-router-dom";
import OrderDetails from "../../common/OrderDetails";

export default function UserOrders() {
  const dispatch = useDispatch();

  const userOrders = useSelector(selectUserOrders);
  const userProfile = useSelector(selectUserProfile);
  useEffect(() => {
    dispatch(fetchUserOrdersAsync(userProfile.id));
  }, [dispatch, userProfile]);

  const noOrdersContent = (
    <div className="mx-auto py-10 bg-white max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl  font-bold tracking-tight text-gray-900 ">
        Your Order-list is Empty !
      </h1>
      or{" "}
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        <Link to="/">Continue Shopping </Link>
        <span aria-hidden="true"> →</span>
      </button>
    </div>
  );

  return (
    <div className="py-6 ">
      <h1 className="mx-auto px-4 sm:px-6 lg:px-8 font-bold text-2xl max-w-4xl ">
        My Orders
      </h1>
      {userOrders.length > 0
        ? userOrders.map((order) => {
            return <OrderDetails key={order.id} order={order} />;
          })
        : noOrdersContent}
    </div>
  );
}
