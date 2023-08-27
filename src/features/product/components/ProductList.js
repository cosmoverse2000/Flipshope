import React, { useEffect } from "react";
import { Fragment, useState } from "react";
//redux imps
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  selectTotaItemsCount,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchAllProductsQueryAsync,
  selectProductListStatus,
} from "../productSlice";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
//roiuter imps
import { Link } from "react-router-dom";
//tailwind imps
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Pagination from "../../common/Pagination";
import { Grid } from "react-loader-spinner";

const sortOptions = [
  { name: "Best Rating", sortBy: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sortBy: "price", order: "asc", current: false },
  {
    name: "Price: High to Low",
    sortBy: "price",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/////////////////////////////////////////PRODUCT LIST MAIN FUNC.COMP.////////////////////////

export default function ProductList() {
  //redux states
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotaItemsCount);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const status = useSelector(selectProductListStatus);
  const dispatch = useDispatch();

  //local use states
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({}); // to use prev filter state ,we create it as usestate
  const [sorting, setSorting] = useState({}); // to use prev sort state, we create it as usestate
  const [page, setPage] = useState(1); // to use prev page state, we create it as usestate

  //local data
  const filtersList = [
    {
      id: "category",
      name: "Category",
      //these options are hardcoded for now, and we get them from our public api Dummy-json
      // both value and label are same words but label have been modified as correct Casing
      // this array is created by applying filter, set and map to data.json product array
      // we only need CATAGORY NAME FROM there
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      //these options are hardcoded for now, and we get them from our public api Dummy-json
      // both value and label are same words but label have been modified as correct Casing
      // this array is created by applying filter, set and map to data.json product array
      // we only need BRAND NAME FROM there
      options: brands,
    },
  ];

  // after any change in filter this fnc would be executed
  const handleFilters = (e, section, option) => {
    let newFilter = { ...filter };

    // below is all the logic to add remove filter item from filter state and
    // set final fiiter in this eg. format
    //'filter' obj format ={"category":["smartphone","laptops"],"brand":['samsung','apple']}
    if (e.target.checked) {
      ///on checking the checbox
      if (section.id in newFilter) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }

      //TODO:on checking box making its value in filterList also checked
      // option.checked = true;
    } else {
      //on unchecking the checkbox
      const index = newFilter[section.id].indexOf(option.value);

      if (newFilter[section.id].length <= 1) {
        ///if last filter value in array
        delete newFilter[section.id];
      } else {
        const x = newFilter[section.id].splice(index, 1);
      }

      //TODO:on checking box making its value in filterList also checked
      // option.checked = false;
    }

    setFilter(newFilter);
  };

  // after sort change this fnc would be executed
  const handleSort = (e, option) => {
    //checking if sorting already applied for current option, if yes then remove it
    if (option.current === true) {
      option.current = false;
      setSorting({}); //removing sorting
    } else {
      const newSorting = {
        _sort: option.sortBy,
        _order: option.order,
      };

      //logic for highlighting only the applied sort-option ,making all false only selected true
      for (let key in sortOptions) {
        //removing other sortings checked if any
        sortOptions[key].current = false;
      }
      option.current = true; //applying current sort

      setSorting(newSorting);
    }
  };
  // after Page change this fnc would be executed
  const handlePage = (e, page) => {
    if (page === -1) {
      // if prev btn clicked
      setPage((prev) => (prev - 1 > 0 ? prev - 1 : 1));
    } else if (page === 0) {
      // if next btn clicked
      setPage((prev) =>
        prev + 1 <= Math.ceil(totalItems / ITEMS_PER_PAGE) ? prev + 1 : prev
      );
    } else {
      // any page number clicked
      setPage(page);
    }
  };

  useEffect(() => {
    //after any setfilter and setSorting this beolw will be dispatched
    //using action 'fetchAllProductsQueryAsync' from Product Slice to call api function
    // then updating 'products' in store
    dispatch(fetchAllProductsQueryAsync({ filter, sorting, page }));
  }, [dispatch, filter, sorting, page]);

  //to reset pagination while filter and sorting
  useEffect(() => {
    setPage(1);
  }, [totalItems, sorting]);

  //to fetch brand and categories from backedn for the first time
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter LIST dialog */}
        <ProductListMobileFilters
          filtersList={filtersList}
          handleFilters={handleFilters}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* {This section is MENU-BAR over product list having Heading, sortOptions/SORTING, grid-hide/show-button} */}
          <ProductListMenuBar
            handleSort={handleSort}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            {/* {FilterList and ProductList in 1:3 ratio in lg screen w/ responsivenes} */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Desktop Filters LIST*/}
              <ProductListDesktopFilters
                filtersList={filtersList}
                handleFilters={handleFilters}
              />

              {/* Product grid */}
              <ProductListGrid products={products} status={status} />
            </div>
          </section>
        </main>

        {/*ADDING THE PAGINATION HERE*/}
        <Pagination
          page={page}
          totalItems={totalItems}
          handlePage={handlePage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}

// used grid for responsiveness with
// (in lg screen -> grid-col-span-1 = filters  && grid-col-span-3 = GRID )
export const ProductListGrid = ({ products, status }) => {
  return (
    <div className="lg:col-span-3 ">
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
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <Link to={`/product-detail/${product.id}`} key={product.id}>
                  <div className="group relative border-2 border-solid p-2">
                    <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-6 inline h-6" />
                          <span className="align-bottom">
                            {" "}
                            {product.rating}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm  block font-medium  text-gray-900">
                          ${discountedPrice(product)}
                        </p>
                        <p className="text-sm mt-2 line-through block font-medium  text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    {/* this is for demo only finally backend will remove this alredy */}
                    {product.stock <= 0 && (
                      <h3 className="text-sm text-center p-1 mt-2 bg-gray-100 text-red-500">
                        • Product is Out of Stock 😔!
                      </h3>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/// lg screen FILTERS LIST
export const ProductListDesktopFilters = ({ filtersList, handleFilters }) => {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filtersList.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        //while clicking on checkbox of Filters we will handle it
                        // here section.id is type of filter- Category, Brand
                        // here option .value give the value of filter like 'smarphone'
                        // we can use 'e also to get crrent val but here we will use option for that
                        onChange={(e) => handleFilters(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

//  mobile screen filter-list as dialog BOX in right side
export const ProductListMobileFilters = ({
  filtersList,
  handleFilters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filtersList.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilters(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

// MENU BAR just on top of product list With Sorting List BUTToN
export const ProductListMenuBar = ({ handleSort, setMobileFiltersOpen }) => {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
      <h1 className=" text-3xl font-bold tracking-tight text-gray-900">
        All Products
      </h1>

      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          {/* {SORTING} */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <p
                        className={classNames(
                          option.current
                            ? "font-medium text-gray-900"
                            : "text-gray-500",
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm"
                        )}
                        // option is sorting type onject we already definde
                        onClick={(e) => {
                          handleSort(e, option);
                        }}
                      >
                        {option.name}
                      </p>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button
          type="button"
          className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
        >
          <span className="sr-only">View grid</span>
          <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
