import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAsync,
  fetchAllOrdersAsync,
  selectAllOrders,
  selectOrderLoadingStatus,
  selectTotalOrdersCount,
  updateOrderAsync,
} from "../../orders/orderSlice";
import {
  ORDERS_PER_PAGE,
  dateFormatter,
  discountedPrice,
} from "../../../app/constants";
import Pagination from "../../common/Pagination";
import OrderDetails from "../../common/OrderDetails";
import chooseColour from "../../common/ColorStatus";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { Grid } from "react-loader-spinner";
import Modals from "../../common/Modals";
import { useAlert } from "react-alert";

const AdminOrders = () => {
  //redux
  const dispatch = useDispatch();
  const allOrdersList = useSelector(selectAllOrders);
  const ordersListCount = useSelector(selectTotalOrdersCount);
  const selectOrderStatus = useSelector(selectOrderLoadingStatus);
  //react-alert
  const alert = useAlert();

  //react-hooks
  const [sorting, setSorting] = useState({
    _sort: "createdAt",
    _order: "desc",
  }); // to use prev sort state create it as usestate
  const [page, setPage] = useState(1); // to use prev page state, we create it as usestate
  const [orderEditable, setOrderEditable] = useState(0);
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [ordersListCount, sorting]);

  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ sorting, page }));
  }, [dispatch, sorting, page]);

  //HANDLE EVENTS
  // after sort change this fnc would be executed
  const handleSort = (e, sort) => {
    setSorting(sort);
  };
  //Show Order Details
  const handleShow = (order) => {
    // console.log(orderId);
    setShowOrderDetails(order);
  };
  //to edit the order status....
  const handleEdit = (e, orderId) => {
    setOrderEditable(orderId);
  };
  //to update the edited order status....
  const handleUpdate = (e, order) => {
    if (e.target.value) {
      const updatedOrder = { id: order.id, orderStatus: e.target.value };
      dispatch(updateOrderAsync(updatedOrder));
    }
    setOrderEditable(-1);
    // /todo: alert fro backend feedback only
    alert.info("Order-Status Updated Successfully");
  };
  // after Page change this fnc would be executed
  const handlePage = (e, page) => {
    if (page === -1) {
      // if prev btn clicked
      setPage((prev) => (prev - 1 > 0 ? prev - 1 : 1));
    } else if (page === 0) {
      // if next btn clicked
      setPage((prev) =>
        prev + 1 <= Math.ceil(ordersListCount / ORDERS_PER_PAGE)
          ? prev + 1
          : prev
      );
    } else {
      // any page number clicked
      setPage(page);
    }
  };
  //to handle delete Product by admin
  const handleDelete = (orderId) => {
    dispatch(deleteOrderAsync(orderId));
    //todo: alert fro backend feedback only
    alert.info("Order Deleted Success");
  };
  //SORTING ARROWS CSS
  const sortingArrow = (sortBy) => {
    return (
      sorting["_sort"] === sortBy &&
      (sorting["_order"] === "asc" ? (
        <ArrowUpIcon className="h-4 mb-1 text-red-500 color inline" />
      ) : (
        <ArrowDownIcon className="h-4 mb-1 text-red-500 inline" />
      ))
    );
  };

  //SORTING OBJECT CREATION
  const sortingObj = (sortBy) => {
    return {
      _sort: sortBy,
      _order: sorting["_order"] === "asc" ? "desc" : "asc",
    };
  };

  return (
    <>
      {/* to show order details */}
      {showOrderDetails ? (
        <div>
          <div className="flex justify-between mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="text-center text-3xl underline font-bold">
              Order-Details
            </h1>
            <div
              className="text-white cursor-pointer bg-green-600 hover:bg-green-500  rounded-md px-3 py-2 text-sm font-medium"
              onClick={() => setShowOrderDetails(null)}
            >
              -{`>`} Go Back{" "}
            </div>
          </div>
          <OrderDetails order={showOrderDetails} />
        </div>
      ) : selectOrderStatus === "loading" ? (
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
        <div className="mx-6">
          {/* ALL orders LISTS */}
          <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5.5/6">
              <div className="overflow-x-auto  bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-4 cursor-pointer text-left">
                        <div
                          onClick={(e) =>
                            handleSort(e, sortingObj("createdAt"))
                          }
                        >
                          Order Time
                          {sortingArrow("createdAt")}
                        </div>
                        <div onClick={(e) => handleSort(e, sortingObj("id"))}>
                          Order Id
                          {sortingArrow("id")}
                        </div>
                      </th>
                      <th
                        className="py-3 px-1 cursor-pointer text-left"
                        onClick={(e) =>
                          handleSort(e, {
                            _sort: "totalItems",
                            _order:
                              sorting["_order"] === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        <div className="text-center">Product Details</div>

                        <div className="flex items-center border-2 rounded-lg  border-gray-400 p-1">
                          <div className="mr-2  font-semibold  basis-1/12">
                            IMG
                          </div>
                          <span className=" basis-8/12 font-semibold">
                            PRODUCT NAME
                          </span>
                          <div className="basis-2/12 text-center font-semibold">
                            QTY.{sortingArrow("totalItems")}
                          </div>
                          <span className="basis-2/12 font-semibold">
                            PRICE
                          </span>
                        </div>
                      </th>

                      <th
                        className="py-3 px-2 cursor-pointer text-center"
                        onClick={(e) => handleSort(e, sortingObj("totalPrice"))}
                      >
                        Total <br /> Amt.{sortingArrow("totalPrice")}
                      </th>
                      <th className="py-3 px-2  text-center">
                        Shipping Address
                      </th>

                      <th
                        className="py-3 px-2 sticky right-24  bg-gray-200 cursor-pointer text-center"
                        onClick={(e) =>
                          handleSort(e, sortingObj("orderStatus"))
                        }
                      >
                        Status{sortingArrow("orderStatus")}
                      </th>
                      <th className="py-3 px-2 sticky right-0 bg-gray-200 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {allOrdersList.map((order) => {
                      return (
                        <tr
                          key={order.id}
                          className="border-b border-gray-200 font-semibold hover:bg-gray-100"
                        >
                          <td className="py-3 px-2 text-left whitespace-nowrap">
                            {/* Delete order warning pop modal we can put anywhere but here in top of order */}
                            {showModal === order.id && (
                              <Modals
                                modalTitle={`Delete ORDER : ${order.id} `}
                                modalWarning={
                                  "Are you sure want to delete this Order ?"
                                }
                                modalActionBtnName={"Remove"}
                                modalCancelBtnName={"Cancel"}
                                onClickModalActionBtn={() => {
                                  handleDelete(order.id);
                                }}
                                onClickModalCancelBtn={() => {}}
                                setShowModal={setShowModal}
                                showModal={showModal}
                              />
                            )}
                            <div className="items-center">
                              <div className=" text-left px-2 font-normal">
                                <b> {dateFormatter(order.createdAt)}</b>
                                <br />
                                {order.id}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-left">
                            {order.orderedItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center border-2 rounded-lg  border-gray-200 p-1"
                              >
                                <div className="mr-2 basis-1/12">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                  />
                                </div>
                                <div className="text-base overflow-hidden whitespace-nowrap basis-8/12 ">
                                  {item.product.title}
                                </div>
                                <span className="text-base basis-1/12 font-semibold">
                                  {item.qty}
                                </span>
                                <span className="text-base basis-2/12 font-semibold">
                                  ${discountedPrice(item.product)}
                                </span>
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center">
                              ${order.totalPrice}
                            </div>
                          </td>
                          <td className="py-3 px-2 max-w-fit text-center">
                            <div className=" items-center justify-center">
                              <i>{order.address.name}</i> ,<br></br>
                              {order.address.street.substring(0, 20)}
                              <span
                                onClick={() => handleShow(order)}
                                className="text-blue-600 cursor-pointer"
                              >{`... Show`}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 sticky right-24 bg-white   hover:bg-gray-100 text-center">
                            {orderEditable === order.id ? (
                              <select
                                className="py-1 px-6 rounded-full text-xs"
                                onChange={(e) => handleUpdate(e, order)}
                              >
                                <option value="">--Select--</option>
                                <option value="Pending">Pending</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColour(
                                  order.orderStatus
                                )} py-1 px-3 rounded-full text-xs`}
                                onClick={() => handleShow(order)}
                              >
                                {order.orderStatus}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 sticky right-0 bg-white hover:bg-gray-100 text-center">
                            <div className="flex item-center justify-center">
                              <button
                                data-modal-target="popup-modal"
                                data-modal-toggle="popup-modal"
                                className="w-6 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                                onClick={() => handleShow(order)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              <div
                                className="w-5 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                                onClick={(e) => handleEdit(e, order.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div
                                className="w-5 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                                onClick={() => setShowModal(order.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/*ADDING THE PAGINATION HERE*/}
                <Pagination
                  page={page}
                  totalItems={ordersListCount}
                  handlePage={handlePage}
                  itemsPerPage={ORDERS_PER_PAGE}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
