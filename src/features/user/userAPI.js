// A mock function to mimic making an async request for data
//get all orders of a particular user
export function fetchUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders?userId=" + userId
    );
    const data = await response.json();
    resolve(data);
  });
}
