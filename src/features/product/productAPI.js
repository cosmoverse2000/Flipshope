import { ITEMS_PER_PAGE } from "../../app/constants";
// A mock function to mimic making an async request for data

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

//USING THIS API TO FETCH PRODUCT LIST, Along w/ filter sort and pagination
// using this promise function to get productlist using query and filter ,added sorting in same api treating _sort,_order as key and giving vlues to it in handle sort
export function fetchAllProductsQuery(filter, sorting, page, admin) {
  //'filter' obj format ={"category":["smartphone","laptops"],"brand":['samsung','adad']}
  //'Sort' obj format ={_sort:"ratings",_order="asc"}
  //'pagination' obj format ={"page":2}
  let queryString = "";

  // converting all key:value pair of 'filter' obj into query string by
  // concating each key:val pair
  //addind FILTER queries
  for (const key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  //adding SORTING queries
  for (const key in sorting) {
    queryString += `${key}=${sorting[key]}&`;
  }
  //addding PAGINATION queries
  queryString += `_page=${page}&_limit=${ITEMS_PER_PAGE}`;
  if (admin) {
    queryString += `&admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

//api function to get 'categories list' in Filters
export function fetchCategories(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}
//api function to get 'brands list' in Filters
export function fetchBrands(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

//POST API to Add Product to PRoduct list by admin
//add PRoduct
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    resolve(data);
  });
}
//to update Edited Product details
export function updateSelectedProduct(upadtedProduct) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + upadtedProduct.id, {
      method: "PATCH",
      body: JSON.stringify(upadtedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    resolve(data);
  });
}
