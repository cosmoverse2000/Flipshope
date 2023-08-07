import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemsAsync,
  increment,
  incrementAsync,
  selectCartItems,
  updateCartItemsAsync,
} from "./cartSlice";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";

export default function Cart() {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const totalPrice = cartItems.reduce(
    (amount, item) => item.qty * item.price + amount,
    0
  );
  const totalItems = cartItems.reduce((amount, item) => item.qty + amount, 0);
  const handleQuantity = (e, cartItem) => {
    dispatch(updateCartItemsAsync({ ...cartItem, qty: +e.target.value }));
  };
  const handleRemove = (e, item) => {
    dispatch(deleteCartItemsAsync(item.id));
  };

  return (
    <>
      {!cartItems.length ? (
        <Navigate to="/" replace={true}></Navigate>
      ) : (
        <div className="mx-6">
          <div className="mx-auto bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <div className="flow-root">
                <h1 className="text-4xl my-10 font-bold tracking-tight text-gray-900">
                  Your Cart
                </h1>
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((product) => (
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
                              <a href={product.thumbnail}>{product.title}</a>
                            </h3>
                            <p className="ml-4">${product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="qty"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty :
                            </label>

                            <select
                              onChange={(e) => handleQuantity(e, product)}
                              name="qty"
                              id="qty"
                              value={product.qty}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(e) => {
                                handleRemove(e, product);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t mt-6 border-gray-200  py-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total-items in the Cart</p>
                <p>{totalItems} Items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{"  "}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/">Continue Shopping</Link>
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
