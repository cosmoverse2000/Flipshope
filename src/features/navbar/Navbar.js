import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../cart/cartSlice";
import {
  selectUserProfile,
  selectUserProfileLoadingStatus,
} from "../user/userSlice";
import { Bars } from "react-loader-spinner";
import { selectLoggedInUserToken } from "../auth/authSlice";

const navigation = [
  { name: "Products", link: "/", current: false, role: "user" },
  { name: "All-Products", link: "/admin", current: true, role: "admin" },
  { name: "All-Orders", link: "/admin/orders", current: true, role: "admin" },
];
const userNavigation = [
  { name: "My Profile", link: "/user-profile" },
  { name: "My Orders", link: "/user-orders" },
  { name: "Logout", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = (props) => {
  const cartItems = useSelector(selectCartItems);
  const userProfile = useSelector(selectUserProfile); //todo:use useeffect and user-profile
  const userToken = useSelector(selectLoggedInUserToken); //todo:use useeffect and user-profile
  const userProfileLoadingStatus = useSelector(selectUserProfileLoadingStatus); //todo:use useeffect and user-profile
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  }, [cartItems]);

  return (
    <>
      {
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-20 items-center justify-between">
                    {/* {NABAR START} */}
                    {/* LOADER ANIMATION BEFORE PROFILE LOAD */}
                    {userToken && userProfileLoadingStatus ? (
                      <Bars
                        height="30"
                        width="30"
                        color="rgb(79, 70, 229)"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass="my-3 mx-auto justify-center"
                        visible={true}
                      />
                    ) : (
                      <div className="flex items-center mx-4">
                        {/*THIS LOGO IS COMMON FOR MOBILE & DESKTOP */}
                        <Link to="/">
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8"
                              src={
                                process.env.PUBLIC_URL + "/flipshope_logo.png"
                              }
                              alt="Flipshope Logo"
                            />
                          </div>
                        </Link>
                        {/* NAVBAR  DESKTOP  START*/}
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map(
                              (item) =>
                                item.role ===
                                  (userProfile ? userProfile.role : "user") && (
                                  <Link
                                    key={item.name}
                                    to={item.link}
                                    className={classNames(
                                      userProfile &&
                                        userProfile.role === "admin"
                                        ? "text-white bg-green-600 hover:bg-green-500"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                      "rounded-md px-3 py-2 text-sm font-medium border-2 border-gray-500"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {userToken && userProfileLoadingStatus ? null : (
                      <div className="hidden md:block">
                        <div className="ml-4 -mb-2 flex items-center md:ml-6">
                          {/* CART ICON desktop START */}
                          <Link to="/user-cart">
                            <button
                              type="button"
                              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="absolute -inset-1.5" />

                              <ShoppingCartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </Link>
                          {/* CARTITEMS BADGE - TotalsItemCount DESKTOP */}
                          {cartItems.length > 0 ? (
                            <Link
                              to="/user-cart"
                              className={`inline-flex items-center rounded-md bg-red-50 z-10 px-2 py-1 mb-7 -ml-3 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ${
                                animate && "animate-ping"
                              }`}
                            >
                              {cartItems.length}
                            </Link>
                          ) : (
                            ""
                          )}
                          {/* CART ICON desktop END*/}
                          {/* PROFILE DROPDOWN DESKTOP */}
                          {userProfile ? (
                            <Menu as="div" className="relative ml-3 mb-3">
                              <div>
                                <Menu.Button className="relative flex max-w-xs items-center rounded-full  border-3 border-gray-500 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                  <span className="absolute -inset-1.5" />
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <img
                                    className="h-12 w-12  rounded-full border-4 border-gray-500"
                                    src={userProfile.imageUrl}
                                    alt="userImg"
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <Link
                                          to={item.link}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          ) : (
                            <div>
                              <Link
                                to={`/login`}
                                className={classNames(
                                  " hover:bg-indigo-900 hover:text-white",
                                  "rounded-md px-3 py-2 mx-3 text-sm font-medium border-2 border-gray-300 bg-indigo-700 text-gray-100"
                                )}
                              >
                                Login
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* NAVBAR  DESKTOP  END*/}

                    {/* NAVBAR  MOBILE  START*/}
                    {/* NAVBAR ICONS MOBILE  START*/}
                    {userToken && userProfileLoadingStatus ? null : (
                      <div className="mx-2 -mb-2 flex md:hidden">
                        {/* CART ICON MOBILE*/}
                        <Link to="/user-cart">
                          <button
                            type="button"
                            className="relative ml-auto flex-shrink-0  rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />

                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {cartItems.length > 0 ? (
                          <Link
                            to="/user-cart"
                            className={`inline-flex items-center rounded-md bg-red-50 z-10 px-2 py-1 mb-6 -ml-3 -mt-2 mr-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ${
                              animate && "animate-ping"
                            }`}
                          >
                            {cartItems.length}
                          </Link>
                        ) : (
                          ""
                        )}
                        {/* CART ICON MOBILE END*/}
                        {/* MOBILE DISCLOSURE PANEL BUTTON */}
                        {userProfile ? (
                          <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800  text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1  focus:ring-offset-gray-800">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XMarkIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <Bars3Icon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Disclosure.Button>
                        ) : (
                          <div>
                            <Link
                              to={`/login`}
                              className={classNames(
                                " hover:bg-indigo-900 hover:text-white",
                                "rounded-md px-3 py-2 mx-1 text-sm font-medium border-2 border-gray-300 bg-indigo-700 text-gray-100"
                              )}
                            >
                              Login
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                    {/* NAVBAR ICONS MOBILE  END*/}
                    {/* NAVBAR  MOBILE  END*/}
                  </div>
                </div>

                {/*  PROFILE DROPDOWN MOBILE SATRT -alag se hai ye only loke popup*/}
                {/* MOBILE USER PROFILE MENU/LIST only popup when clicked abv disclosue-btn*/}
                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map(
                      (item) =>
                        item.role ===
                          (userProfile ? userProfile.role : "user") && (
                          <Link key={item.name} to={item.link}>
                            <Disclosure.Button
                              as="div"
                              className={classNames(
                                userProfile && userProfile.role === "admin"
                                  ? "text-white bg-green-600 hover:bg-green-500"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-1 my-1 text-base font-medium border-2 border-gray-500"
                              )}
                            >
                              {item.name}
                            </Disclosure.Button>
                          </Link>
                        )
                    )}
                    {/* {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))} */}
                  </div>
                  {userProfile && (
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12  rounded-full border-4 border-gray-500"
                            src={userProfile.imageUrl}
                            alt="userImg"
                          />
                        </div>
                        <div className="ml-3 mr-auto">
                          <div className="text-base font-medium leading-none text-white">
                            {userProfile.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {userProfile.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="div"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            <Link to={item.link}>{item.name}</Link>
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  )}
                </Disclosure.Panel>
                {/*  PROFILE DROPDOWN MOBILE END*/}
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                FlipShope 🛒
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {props.children}
            </div>
          </main>
        </div>
      }
    </>
  );
};

export default Navbar;
