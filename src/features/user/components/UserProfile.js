import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserLoadStatus,
  selectUserProfile,
  updateUserProfileAsync,
} from "../userSlice";
import { useForm } from "react-hook-form";
import { Grid } from "react-loader-spinner";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  //TODO: ALso add payments section in userprofile, user can add card details
  //redux
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const status = useSelector(selectUserLoadStatus);
  // console.log(userProfile, "userProfile");
  //react
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [showEditForm, setShowEditForm] = useState(-1);
  const [showAddNewAddressForm, setShowAddNewAddressForm] = useState(0);

  //react-forms
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  //handle func
  const handleEdit = (address, index) => {
    const newUser = { ...userProfile, addresses: [...userProfile.addresses] };
    //to shalow copy and getting correct index
    newUser.addresses.splice(index, 1, address); //removing item from index and replacing w/ addrs
    dispatch(updateUserProfileAsync(newUser));
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userProfile, addresses: [...userProfile.addresses] };
    //to shalow copy and getting correct index
    newUser.addresses.splice(index, 1);
    dispatch(updateUserProfileAsync(newUser));
  };

  const handleShowEditForm = (e, index) => {
    // to show the form to edit the particular address
    setShowEditForm(index);
    setShowAddNewAddressForm(0);
    // to set prev value of address item in form
    const address = userProfile.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("pincode", address.pincode);
    setValue("region", address.region);
    setValue("city", address.city);
  };
  const handleNameEdit = (updatedName) => {
    dispatch(updateUserProfileAsync({ name: updatedName }));
    setShowNameEdit(false);
  };

  const handleAddNewAddress = (address) => {
    const newUser = {
      ...userProfile,
      addresses: [...userProfile.addresses, address],
    };
    dispatch(updateUserProfileAsync(newUser));
    setShowAddNewAddressForm(0);
  };

  return (
    <div className="py-6 ">
      <h1 className="mx-auto px-4 sm:px-6 lg:px-8 font-bold text-2xl max-w-4xl ">
        My Profile
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
      ) : (
        <div className="mx-auto mt-4 py-6 bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flow-root">
            {/* //USER NAME WITH EDIT FUNCTIONALITY w/ VALIDATION */}
            <div className="flex items-end text-base font-medium text-gray-900">
              {showNameEdit ? (
                <form
                  className=" flex items-end bg-white "
                  onSubmit={handleSubmit((data) => {
                    handleNameEdit(data.userName);
                    // console.log(data, "deit name");
                  })}
                >
                  <div className="mt-2 mr-4">
                    <input
                      type="text"
                      id="userName"
                      {...register("userName", {
                        required: "• User Name is Required !",
                        maxLength: {
                          value: 40,
                          message: "• Max Name Length Exceded !",
                        },
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: "• Only Alphabets Accepted !", // JS only: <p>error message</p> TS only support string
                        },
                      })}
                      className="text-4xl  font-bold tracking-tight text-indigo-600 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.userName && (
                      <p className="text-red-500">{errors.userName.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                    {/* on save 'handleSubmit' from react-form will run */}
                  </button>
                </form>
              ) : (
                <>
                  <p className="text-4xl mr-4 font-bold tracking-tight text-indigo-600">
                    {userProfile.name ? userProfile.name : "Guest User"}
                  </p>
                  <button
                    type="button"
                    className="font-medium mx-2 -mb-1  text-gray-900 hover:text-indigo-500"
                    onClick={() => {
                      setValue(
                        "userName",
                        userProfile.name ? userProfile.name : "Guest User"
                      );
                      setShowNameEdit(true);
                    }}
                  >
                    <PencilSquareIcon
                      className="mb-2  h-5 w-5 inline"
                      aria-hidden="true"
                    />{" "}
                    Edit Name
                  </button>
                </>
              )}
            </div>
            {/* //DISPLAY EMAIL AND ROLE if admin */}
            <div className="flex justify-between text-base font-medium text-gray-900">
              <div className="my-4 text-xl font-medium text-green-600">
                Email : {userProfile.email}
              </div>
              {userProfile.role === "admin" && (
                <div className="my-4 text-xl font-medium text-green-600">
                  Role : Admin
                </div>
              )}
            </div>
          </div>
          <div className="">
            {/* //All USER ADDRESSES SAVED LIST w/ EDIT AND REMEOVE FUNCTIONS */}
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Your Addresses :
              </legend>

              <ul role="list">
                {userProfile.addresses &&
                  userProfile.addresses.map((address, index) => (
                    <div key={index}>
                      {showEditForm === index ? (
                        <form
                          className="px-5 bg-white py-6 "
                          onSubmit={handleSubmit((data) => {
                            handleEdit(data, index);

                            setShowEditForm(-1);
                          })}
                        >
                          <div>
                            <div className="border-b border-gray-900/10 pb-6">
                              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
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
                                          value:
                                            /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi,
                                          message:
                                            "• Please enter valid E-mail !", // JS only: <p>error message</p> TS only support string
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
                                  setShowEditForm(-1);
                                }}
                                className="rounded-md border-2 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Save Address
                                {/* on save 'handleSubmit' from react-form will run */}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        ""
                      )}
                      <div className="border-solid border-2  border-gray-200 p-3 my-2">
                        <div className="flex max-sm:flex-col justify-between">
                          <div className="">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 max-w-xs md:max-w-lg overflow-hidden whitespace-nowrap truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                              {address.pincode}
                            </p>
                          </div>
                          <div className="hidden  sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              Phone: {address.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                              {address.city}
                            </p>
                          </div>
                          <div className="max-sm:justify-between flex sm:flex-col sm:items-end">
                            <button
                              type="button"
                              className="font-medium  text-indigo-600 hover:text-indigo-500"
                              onClick={(e) => {
                                handleShowEditForm(e, index);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(e) => {
                                handleRemove(e, index);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </ul>
            </fieldset>
            {/* //FORM TO ADD NEW ADDRESSS TO USER ADDRESSES */}

            <div>
              {showAddNewAddressForm ? (
                <form
                  className="px-5 bg-white py-6 "
                  onSubmit={handleSubmit((data) => {
                    handleAddNewAddress(data);
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
                          setShowAddNewAddressForm(0);
                        }}
                        className="rounded-md border-2 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save Address
                        {/* on save 'handleSubmit' from react-form will run */}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                ""
              )}
              <div className="border-b border-gray-900/10 flex items-center justify-end  py-2">
                <button
                  type="submit"
                  onClick={() => {
                    reset();
                    setShowAddNewAddressForm(1);
                    setShowEditForm(-1);
                  }}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  + Add New Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
