// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

// using this promise function to get productlist using query and filter ,added sorting in same api treating _sort,_order as key and giveing vlues to it in handle sort
export function fetchFilterSortedProducts(filter) {
  //'filter' obj format ={"category"="smartphone"}
  let queryString = "";

  // converting all key:value pair of 'filter' obj into query string by concating each key:val pair
  for (const key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
