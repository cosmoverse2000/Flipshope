import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  selectCartItems,
  updateCartItemAsync,
} from "../features/cart/cartSlice";
import { Link, Navigate } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
import {
  addToOrdersAsync,
  selectCurrentOrder,
  selectOrderLoadingStatus,
} from "../features/orders/orderSlice";
import {
  selectUserProfile,
  updateUserProfileAsync,
} from "../features/user/userSlice";
import { Grid } from "react-loader-spinner";
import Modals from "../features/common/Modals";
import { useAlert } from "react-alert";

const CheckoutPage = () => {
  //set modal id for which item you want to show modal
  const [showModal, setShowModal] = useState(0);
  const [selectAddress, setSelectAddress] = useState(null);
  const [selectPayment, setSelectPayment] = useState(null);
  //redux
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const userProfile = useSelector(selectUserProfile);
  const currentOrder = useSelector(selectCurrentOrder);
  const placeOrderStatus = useSelector(selectOrderLoadingStatus);
  //react alert
  const alert = useAlert();

  //react-forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalPrice = cartItems.reduce(
    (amount, item) => item.qty * item.product.discountedPrice + amount,
    0
  );
  const totalItems = cartItems.reduce((amount, item) => item.qty + amount, 0);

  const handleQuantity = (e, cartItem) => {
    dispatch(updateCartItemAsync({ ...cartItem, qty: +e.target.value }));
  };
  const handleRemove = (prodId) => {
    dispatch(deleteCartItemAsync({ prodId, alert }));
  };
  const handleAddress = (e) => {
    setSelectAddress(e.target.value);
  };
  const handlePayments = (e) => {
    setSelectPayment(e.target.value);
  };
  const handleOrders = () => {
    if (selectAddress === null || selectPayment === null) {
      window.alert("Please, Select address & payment Method !");
      return;
    }
    const order = {
      user: userProfile.id,
      orderedItems: cartItems,
      totalItems,
      totalPrice,
      selectPayment,
      address: userProfile.addresses[selectAddress],
      // orderStatus: "Pending", //this can be set by admin for ordered status or backend def
    };
    dispatch(addToOrdersAsync(order));
    //TODO : Succes page on order success
    //TODO : clear cart on both serevr and local
    //TODO : stock to be reduced in backend/db accorig to ordreed items
  };

  return (
    <>
      {!cartItems.length ? (
        <Navigate to="/user-cart" replace={true}></Navigate>
      ) : (
        <>
          {placeOrderStatus === "loading" ? (
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
          ) : currentOrder && currentOrder.selectPayment === "cash" ? (
            <Navigate
              to={`/order-success/${currentOrder.id}`}
              replace={true}
            ></Navigate>
          ) : (
            currentOrder &&
            currentOrder.selectPayment === "card" && (
              <Navigate to={`/stripe-payment`} replace={true}></Navigate>
            )
          )}
          <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <div className="lg:col-span-3  ">
                <form
                  className="px-5 bg-white py-6 my-12"
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      updateUserProfileAsync({
                        ...userProfile,
                        addresses: [...userProfile.addresses, data],
                      })
                    );
                    reset();
                  })}
                >
                  <div>
                    <div className="border-b border-gray-900/10 pb-6">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="name"
                              {...register("name", {
                                required: "• Name is Required !",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "• Email is Required !",
                                pattern: {
                                  value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi,
                                  message: "• Please enter valid E-mail !", // JS only: <p>error message</p> TS only support string
                                },
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "• Phone is Required !",
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "• Street is Required !",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "• City is Required !",
                              })}
                              id="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("region", {
                                required: "• State is Required !",
                              })}
                              id="region"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.region && (
                              <p className="text-red-500">
                                {errors.region.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pincode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pincode", {
                                required: "• PinCode is Required !",
                              })}
                              id="pincode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.pincode && (
                              <p className="text-red-500">
                                {errors.pincode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-900/10 flex items-center justify-end gap-x-6 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          reset();
                        }}
                        className="rounded-md border-2 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add to Addresses
                      </button>
                    </div>

                    <div className="">
                      <div className="mt-4 space-y-10">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Addresses
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose from Existing addresses.
                          </p>

                          <ul>
                            {userProfile.addresses.map((address, index) => (
                              <li
                                key={index}
                                className="border-solid border-2  border-gray-200 p-5 "
                              >
                                <div className="flex gap-x-4">
                                  <input
                                    id={address.email}
                                    name="address"
                                    type="radio"
                                    onChange={handleAddress}
                                    value={index}
                                    className="h-4 w-4 m-auto cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label
                                    htmlFor={address.email}
                                    className="max-sm:flex-col flex justify-between cursor-pointer w-full "
                                  >
                                    <div className="">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {address.name}
                                      </p>
                                      <p className="mt-1 max-w-[15rem] md:max-w-lg overflow-hidden whitespace-nowrap truncate text-xs leading-5 text-gray-500">
                                        {address.street}
                                      </p>
                                      <p className="text-sm leading-6 text-gray-500">
                                        {address.pincode}
                                      </p>
                                    </div>
                                    <div className="  sm:flex sm:flex-col sm:items-end">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        Phone: {address.phone}
                                      </p>
                                      <p className="text-sm leading-6 text-gray-500">
                                        {address.city}
                                      </p>
                                    </div>
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </fieldset>
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Payment Methods
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose One.
                          </p>
                          <div className="mt-4 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="card-pay"
                                name="payment"
                                type="radio"
                                value="card"
                                onChange={handlePayments}
                                checked={selectPayment === "card"}
                                className="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="card-pay"
                                className="block text-sm cursor-pointer font-medium leading-6 text-gray-900"
                              >
                                Card Payment
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="cash-pay"
                                name="payment"
                                type="radio"
                                value="cash"
                                onChange={handlePayments}
                                checked={selectPayment === "cash"}
                                className="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="cash-pay"
                                className="block text-sm font-medium cursor-pointer leading-6 text-gray-900"
                              >
                                Cash
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="lg:col-span-2 ">
                <div className=" bg-white my-12 mx-auto max-w-7xl px-5">
                  <div className="flow-root">
                    <h1 className="text-4xl my-10 font-bold tracking-tight text-gray-900">
                      Your Cart
                    </h1>
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((cartItem) => (
                        <li key={cartItem.product.id} className="flex py-6">
                          {showModal === cartItem.product.id && (
                            <Modals
                              modalTitle={`Delete ${cartItem.product.title}!`}
                              modalWarning={
                                "Are you sure want to delete this item from the cart ?"
                              }
                              modalActionBtnName={"Remove"}
                              modalCancelBtnName={"Cancel"}
                              onClickModalActionBtn={() => {
                                handleRemove(cartItem.id);
                              }}
                              onClickModalCancelBtn={() => {}}
                              setShowModal={setShowModal}
                              showModal={showModal}
                            />
                          )}
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
                                  ${cartItem.product.discountedPrice}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {cartItem.product.brand}
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
                                  onChange={(e) => handleQuantity(e, cartItem)}
                                  name="qty"
                                  id="qty"
                                  value={cartItem.qty}
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
                                  onClick={() =>
                                    setShowModal(cartItem.product.id)
                                  }
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

                  <div className="border-t mt-6 border-gray-200  py-6 ">
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
                      <div
                        onClick={handleOrders}
                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Proceed To Payment
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{"  "}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <Link to="/">Continue Shopping</Link>
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
