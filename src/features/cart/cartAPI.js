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

    if (response.ok) {
      const data = await response.json();
      // console.log(data, "add items res");
      resolve(data);
    }
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
//to update cart update qty
export function updateCartItems(upadteData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/cart/" + upadteData.id,
      {
        method: "PATCH",
        body: JSON.stringify(upadteData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    resolve(data);
  });
}
//to remove cart item
export function deleteCartItems(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
    });

    // since 'delete' method will not give any resonse data
    // we manually send it to uppdate local cart
    const data = await response.json(); //this data would empty in 'delete'case
    if (response.ok) {
      console.log("deleted");
    } else {
      console.log("delete item failed");
    }

    resolve({ data: { id: itemId } });
  });
}
//to reset cart on order success
export function resetCartItems(userId) {
  return new Promise(async (resolve) => {
    const userData = await fetchCartByUserId(userId);

    for (const cartItemId of userData.data) {
      await deleteCartItems(cartItemId.id);
    }
    resolve({ status: "CartReset success" });
  });
}
