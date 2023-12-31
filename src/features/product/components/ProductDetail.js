import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducById,
  fetchProductByIdAsync,
  selectProductListStatus,
} from "../productSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  addItemToCartAsync,
  selectCartItems,
  selectCartStatus,
} from "../../cart/cartSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";
import { selectLoggedInUserToken } from "../../auth/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  //redux
  const product = useSelector(selectProducById);
  const prodDetailStatus = useSelector(selectProductListStatus);
  const cartItems = useSelector(selectCartItems);
  const cartUpdatingStatus = useSelector(selectCartStatus);
  const userToken = useSelector(selectLoggedInUserToken);
  const dispatch = useDispatch();
  //router
  const navigate = useNavigate();
  const params = useParams();
  //alert
  const alert = useAlert();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // MOBILE VIEW IMAGE SLIDE BTN FUNC -start
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1020);
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % product.images.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? product.images.length - 1 : prevSlide - 1
    );
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  // MOBILE VIEW IMAGE SLIDE BTN FUNC -End

  const handleCart = (e) => {
    e.preventDefault();
    //checking if item already present in cart
    if (product.stock <= 0) {
      alert.error("PRODUCT OUT OF STOCK!");
      return;
    }

    //add item to cart only after user login
    if (userToken) {
      const index = cartItems.findIndex(
        (item) => item.product.id === product.id
      );
      if (index >= 0 && cartItems.length > 0) {
        alert.error("Already added to cart !");
        // console.log("Already Added to Cart");
        return;
      }
      const newItemToCart = {
        product: product.id,
        qty: 1,
      };
      //if customer Choose color and size- adding it to cart & order details
      if (selectedColor) {
        newItemToCart.color = selectedColor;
      }
      if (selectedSize) {
        newItemToCart.size = selectedSize;
      }

      dispatch(addItemToCartAsync({ newItemToCart, alert }));
    } else {
      alert.error("PLEASE, LOGIN TO CONTINUE !");
      return;
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  // useeffect for mobile imgs crousel creator
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };
    window.addEventListener("resize", handleResize);
    if (prodDetailStatus !== "loading") {
      const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", handleResize);
      };
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [prodDetailStatus]);

  return (
    <>
      {prodDetailStatus === "loading" ? (
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
        product && (
          <div className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <div
                  role="list"
                  className="mx-auto my-2 flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  {product.breadcrumbs &&
                    product.breadcrumbs.map((breadcrumb) => (
                      <li key={breadcrumb.id}>
                        <div className="flex items-center">
                          <a
                            href={breadcrumb.href}
                            className="mr-2 text-sm font-medium text-gray-900"
                          >
                            {breadcrumb.name}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-300"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      </li>
                    ))}
                  <div className="text-sm">
                    <a
                      href={product.thumbnail}
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {product.title}
                    </a>
                  </div>
                </div>
              </nav>

              {/* Image gallery  START*/}
              {isMobile ? (
                <div className="relative">
                  {/* MOBILE - IMAGES CAROUSEL/SLIDER start */}
                  <div className="flex overflow-hidden">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`${
                          index === currentSlide ? "block" : "hidden"
                        } w-full h-full transition-opacity duration-500 ease-in-out`}
                      >
                        <img
                          src={image}
                          alt={`Slide ${index}`}
                          className="w-[100vh] h-[50vh]"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
                    <button
                      onClick={prevSlide}
                      className="absolute top-0 bottom-0 hover:bg-opacity-30 pl-6 hover:bg-white text-gray-400 text-9xl focus:outline-none"
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-0 bottom-0 hover:bg-opacity-30 pr-6 hover:bg-white text-gray-400 text-9xl focus:outline-none"
                    >
                      &#8250;
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="flex space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-4 h-4 rounded-full ${
                            index === currentSlide
                              ? "bg-blue-500"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        ></button>
                      ))}
                    </div>
                  </div>
                  {/* MOBILE - IMAGES CAROUSEL/SLIDER end */}
                </div>
              ) : (
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={product.images[1]}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={product.images[2]}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={product.images[3]}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              )}
              {/* Image gallery  END*/}

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.title}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${product.discountedPrice}
                  </p>
                  <p className="text-3xl line-through tracking-tight text-gray-500">
                    ${product.price}
                  </p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.rating > rating
                                ? "text-gray-900"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          Color
                        </h3>

                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a color
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {product.colors.map((color) => (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedClass,
                                    active && checked
                                      ? "ring ring-offset-1"
                                      : "",
                                    !active && checked ? "ring-2" : "",
                                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {color.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.class,
                                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mt-10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Size
                          </h3>
                          <a
                            href="/"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Size guide
                          </a>
                        </div>

                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a size
                          </RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {product.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                disabled={!size.inStock}
                                className={({ active }) =>
                                  classNames(
                                    size.inStock
                                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                      : "cursor-not-allowed bg-gray-50 text-gray-200",
                                    active ? "ring-2 ring-indigo-500" : "",
                                    "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="span">
                                      {size.name}
                                    </RadioGroup.Label>
                                    {size.inStock ? (
                                      <span
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-indigo-500"
                                            : "border-transparent",
                                          "pointer-events-none absolute -inset-px rounded-md"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                      >
                                        <svg
                                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect="non-scaling-stroke"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    <button
                      onClick={(e) => handleCart(e)}
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {cartUpdatingStatus === "loading"
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  {product.highlights && product.highlights.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-sm font-medium text-gray-900">
                        Highlights
                      </h3>

                      <div className="mt-4">
                        <ul className="list-disc space-y-2 pl-4 text-sm">
                          {product.highlights.map(
                            (highlight) =>
                              (highlight && highlight.length) > 0 && (
                                <li key={highlight} className="text-gray-400">
                                  <span className="text-gray-600">
                                    {highlight}
                                  </span>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="border-2 text-center cursor-pointer mt-auto mr-auto bg-white hover:bg-gray-500 hover:text-white  rounded-md px-3 py-2 text-sm font-medium"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go Back{" "}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
