import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../userSlice";

export default function UserProfile() {
  const userProfile = useSelector(selectUserProfile);
  const handleEdit = () => {};
  const handleRemove = () => {};
  return (
    <div className="py-6 ">
      <h1 className="mx-auto px-4 sm:px-6 lg:px-8 font-bold text-2xl max-w-4xl ">
        My Profile
      </h1>
      <div className="mx-auto mt-8 py-6 bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flow-root">
          <h1 className="text-4xl   font-bold tracking-tight text-gray-900">
            Name : {userProfile.name ? userProfile.name : "Guest User"}
          </h1>
          <div className="my-4 text-xl font-medium text-red-500">
            Email Address : {userProfile.email}
          </div>
        </div>

        <div className="mt-4 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Your Addresses :
            </legend>

            <ul role="list">
              {userProfile.addresses.map((address, index) => (
                <div
                  key={index}
                  className="border-solid border-2  border-gray-200 p-5 my-3"
                >
                  <div className="flex max-sm:flex-col justify-between">
                    <div className="">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
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
                          handleEdit(e, address.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={(e) => {
                          handleRemove(e, address.id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
