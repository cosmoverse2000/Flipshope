import { ORDERS_PER_PAGE } from "../../app/constants";

//On click order item - API
export function addToOrders(order) {
  return new Promise(async (resolve) => {
    // console.log(order, "orderfa");
    const response = await fetch("/order/", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    resolve(data);
  });
}
//get all orders of a particular user
export function fetchUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/order/user");
    const data = await response.json();
    resolve(data);
  });
}

//to update orderStats from admin
export function updateOrder(upadtedOrder) {
  return new Promise(async (resolve) => {
    const response = await fetch("/order/admin/" + upadtedOrder.id, {
      method: "PATCH",
      body: JSON.stringify(upadtedOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data, "order update");
    resolve(data);
  });
}

//to remove Order By ADMIN
export function deleteOrder(orderId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/order/admin/" + orderId, {
      method: "DELETE",
    });

    const data = await response.json(); //this data would empty in 'delete'case
    if (response.ok) {
      console.log("deleted Order");
      resolve({ data: { id: data.id } });
    } else {
      console.log("delete Order failed");
    }
  });
}
// Fetch All Orders for Admin only
export function fetchAllOrders({ sorting, page }) {
  //'Sort' obj format ={_sort:"ratings",_order="asc"}
  //'pagination' obj format ={"page":2}
  let queryString = "";
  //adding sorting queries
  for (const key in sorting) {
    queryString += `${key}=${sorting[key]}&`;
  }

  //addding pagination queries
  queryString += `_page=${page}&_limit=${ORDERS_PER_PAGE}`;

  // console.log(queryString);

  //calling api
  return new Promise(async (resolve) => {
    const response = await fetch("/order/admin?" + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { ordersList: data, totalOrders: totalOrders } });
  });
}
