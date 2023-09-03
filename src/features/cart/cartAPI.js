//On add item click API
export function addItemToCart(cartItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(cartItem),
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
export function fetchCartByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart");
    const data = await response.json();

    resolve({ data });
  });
}
//to update cart update qty
export function updateCartItem(updatedCartItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + updatedCartItem.id, {
      method: "PATCH",
      body: JSON.stringify(updatedCartItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve(data);
  });
}
//to remove cart item
export function deleteCartItem(cartItemId) {
  return new Promise(async (resolve) => {
    // console.log(cartItemId, "cartItemId");
    const response = await fetch("/cart/" + cartItemId, {
      method: "DELETE",
    });

    // since 'delete' method will not give any resonse data
    // we manually send it to uppdate local cart
    const data = await response.json(); //this data would empty in 'delete'case
    if (response.ok) {
      console.log("cartItem deleted");
    } else {
      console.log("delete item failed");
    }
    // console.log(data);
    //todo:fix this when reseting cart its running delete cart items two timmes for each itm
    resolve({ data: { id: data && data.id } });
  });
}
//to reset cart on order success
export function resetCartItems() {
  return new Promise(async (resolve) => {
    const userData = await fetchCartByUserId();

    for (const cartItem of userData.data) {
      await deleteCartItem(cartItem.id);
    }
    resolve({ status: "CartReset success" });
  });
}
