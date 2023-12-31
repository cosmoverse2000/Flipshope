import React from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  signupUserAccountAsync,
  selectLoggedInUserToken,
  selectAuthErrors,
  authLoadingStatus,
  resetAuthErrors,
} from "../authSlice";
//router
import { Link, Navigate } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Signup() {
  //redux
  const dispatch = useDispatch();
  const authErrors = useSelector(selectAuthErrors);
  const authLoadStatus = useSelector(authLoadingStatus);
  const userToken = useSelector(selectLoggedInUserToken);
  //react-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (authErrors) {
      dispatch(resetAuthErrors());
    }
  }, [dispatch]);

  return (
    <>
      {userToken && <Navigate to="/" replace={true}></Navigate>}
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <a
              href={process.env.REACT_APP_BASE_URL}
              className=" underline text-sm font-medium shadow-2xl text-center text-indigo-600"
            >
              <img
                className="mx-auto h-16 shadow-2xl w-auto cursor-pointer"
                src={process.env.PUBLIC_URL + "/flipshope_logo.png"}
                alt="Flipshope Logo"
              />
              <p>
                <b> www.flipshope.com</b>
              </p>
            </a>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a New Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit((data) => {
                dispatch(
                  signupUserAccountAsync({
                    email: data.email,
                    password: data.password,
                  })
                );
                // console.log(data);
              })}
              className="space-y-6"
              method="POST"
              noValidate
            >
              <div>
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
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  {authErrors && (
                    <p className="text-red-500 whitespace-pre-line">
                      {authErrors.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "• Password is Required !",

                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `• At least 8 characters.\t
                      • Must contain at least 1 uppercase letter, 1 lowercase
                      \tletter, and 1 number.\t
                      • Can contain special characters.`,
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500 whitespace-pre-line">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    {...register("confirmPassword", {
                      required: "• Confirm Password is Required !",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "• Password not Matching !",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {authLoadStatus === "loading" ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log in to your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
