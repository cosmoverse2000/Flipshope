import React from "react";
//router
import { Link } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  authLoadingStatus,
  resetPasswordAsync,
  selectAuthErrors,
  selectNewPwdSavedStatus,
} from "../authSlice";

export default function ResetPassword() {
  //url params
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  //react-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //redux
  const dispatch = useDispatch();
  const newPwdSavedStatus = useSelector(selectNewPwdSavedStatus);
  const authErrors = useSelector(selectAuthErrors);
  const pwdSetLoadingSatus = useSelector(authLoadingStatus);

  // console.log(errors);
  return (
    <>
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={process.env.PUBLIC_URL + "/flipshope_logo.png"}
              alt="Flipshope Logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Set New Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit((data) => {
                dispatch(
                  resetPasswordAsync({
                    email: email,
                    token: token,
                    newPwd: data.password,
                  })
                );
              })}
              className="space-y-6"
              action="#"
              method="POST"
              noValidate
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
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
                    Confirm New Password
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
                  {authErrors && (
                    <p className="text-red-500 px-3"> {authErrors.message}</p>
                  )}
                  {newPwdSavedStatus && (
                    <p className="text-green-500 px-3">
                      New Pasword Set Successfully !
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {pwdSetLoadingSatus === "loading"
                    ? "Reseting..."
                    : "Reset Password"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Go Back to ?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-10 text-center text-sm text-gray-900">
            <b>Expired or Unauthorized Reset Link... ☹️!</b>
            <br></br>
            Go Back to ?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </>
      )}
    </>
  );
}
