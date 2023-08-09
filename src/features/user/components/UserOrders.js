import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserOrdersAsync,
  selectUserOrders,
  selectUserProfile,
} from "../userSlice";
import { Link } from "react-router-dom";

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
            return (
              <div key={order.id}>
                <div>
                  <div className="mx-auto mt-8 py-6 bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="flow-root">
                      <h1 className="text-4xl   font-bold tracking-tight text-gray-900">
                        Order Id : #{order.id}
                      </h1>
                      <div className="my-4 text-xl font-medium text-red-500">
                        Order Status : {order.orderStatus}
                      </div>
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {order.orderedItems.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.thumbnail}>
                                      {product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.brand}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t mt-6 border-gray-200  py-3">
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${order.totalPrice}</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total-items in the Cart</p>
                        <p>{order.totalItems} Items</p>
                      </div>
                    </div>
                    <div className="border-solid border-2  border-gray-200 p-3 ">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.address.street}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {order.address.pincode}
                          </p>
                        </div>
                        <div className="hidden  sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            Phone: {order.address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {order.address.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : noOrdersContent}
    </div>
  );
}
