import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserLoadStatus } from "../userSlice";
import { Link } from "react-router-dom";
import OrderDetails from "../../common/OrderDetails";
import { Grid } from "react-loader-spinner";
import {
  fetchUserOrdersAsync,
  selectUserOrders,
} from "../../orders/orderSlice";

export default function UserOrders() {
  const dispatch = useDispatch();

  const userOrders = useSelector(selectUserOrders);
  const status = useSelector(selectUserLoadStatus);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
  }, [dispatch]);

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
      {status === "loading" ? (
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
      ) : userOrders.length > 0 ? (
        userOrders.map((order) => {
          return <OrderDetails key={order.id} order={order} />;
        })
      ) : (
        noOrdersContent
      )}
    </div>
  );
}
