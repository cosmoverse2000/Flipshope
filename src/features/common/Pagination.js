import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ page, handlePage, totalItems, itemsPerPage }) => {
  const mobileBtnCssClasses =
    "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-600 hover:text-white";

  const desktopBtnCssClasses =
    "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white focus:z-20 focus:outline-offset-0";

  const desktopPgBtnClasses =
    "relative z-10 cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white";

  const start = (page - 1) * itemsPerPage;

  const mobilePaginationContent = (
    <div className="flex flex-1 justify-between sm:hidden">
      <div
        className={mobileBtnCssClasses}
        onClick={(e) => {
          handlePage(e, -1);
        }}
      >
        Previous
      </div>
      <div
        className={mobileBtnCssClasses}
        onClick={(e) => {
          handlePage(e, 0);
        }}
      >
        Next
      </div>
    </div>
  );

  const desktopPaginationContent = (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{start + 1}</span> to{" "}
          <span className="font-medium">
            {start + itemsPerPage > totalItems
              ? totalItems
              : start + itemsPerPage}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <div
            className={desktopBtnCssClasses}
            onClick={(e) => {
              handlePage(e, -1);
            }}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

          {/* This below 'Array.from' is used to create any array of required length without any values inside array */}
          {Array.from({
            length: Math.ceil(totalItems / itemsPerPage),
          }).map((each, index) => {
            return (
              <div
                key={index}
                aria-current="page"
                //applied desktopPgBtnClasses and higlighted the current page using conditn
                className={`${desktopPgBtnClasses} ${
                  index + 1 === page && "bg-indigo-600 text-white"
                }`}
                onClick={(e) => {
                  handlePage(e, index + 1);
                }}
              >
                {index + 1}
              </div>
            );
          })}

          <div
            className={desktopBtnCssClasses}
            onClick={(e) => {
              handlePage(e, 0);
            }}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </nav>
      </div>
    </div>
  );
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {mobilePaginationContent}
      {desktopPaginationContent}
    </div>
  );
};

export default Pagination;
