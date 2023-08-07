//On add item click API
export function addItemsToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    resolve(data);
  });
}

//on start app load user's prev cart items
export function fetchCartByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?userId=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
