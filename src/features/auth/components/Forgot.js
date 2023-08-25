import React from "react";
//redux

//router
import { Link } from "react-router-dom";
//form
import { useForm } from "react-hook-form";

export default function Forgot() {
  //react-forms
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // console.log(errors);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={process.env.PUBLIC_URL + "/flipshope_logo.png"}
            alt="Flipshope Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter email to reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
              //   TODO : will implement backend to reset link to email to reset password
            })}
            className="space-y-6"
            action="#"
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
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send back to ?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
