import React from "react";
import chooseColour from "./ColorStatus";
import { dateFormatter, discountedPrice } from "../../app/constants";

const OrderDetails = ({ order }) => {
  return (
    <div>
      <div>
        <div className="mx-auto mt-8 py-6 bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flow-root">
            <h1 className="text-4xl   font-bold tracking-tight text-gray-900">
              Order Id : #{order.id}
            </h1>
            <div
              className={`my-4 text-xl font-semibold ${chooseColour(
                order.orderStatus
              )}`}
            >
              Order Status : {order.orderStatus}
            </div>
            <ul className="-my-6 divide-y divide-gray-200">
              {order.orderedItems.map((cartItem) => (
                <li key={cartItem.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={cartItem.product.thumbnail}
                      alt={cartItem.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={cartItem.product.thumbnail}>
                            {cartItem.product.title}
                          </a>
                        </h3>
                        <p className="ml-4">
                          ${discountedPrice(cartItem.product)}
                        </p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className="mt-1 text-sm text-gray-500">
                          {cartItem.product.brand}
                        </p>
                        <p className="ml-4">Qty. {cartItem.qty}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t mt-6 border-gray-200  py-3">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal :</p>
              <p>${order.totalPrice}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total-items in the Cart :</p>
              <p>{order.totalItems} Items</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Delivery Address :</p>
              <p>Dated : {dateFormatter(order.createdAt)}</p>
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
};

export default OrderDetails;
