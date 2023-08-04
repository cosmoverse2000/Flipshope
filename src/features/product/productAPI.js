// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

// using this promise function to get productlist using query and filter ,added sorting in same api treating _sort,_order as key and giving vlues to it in handle sort
export function fetchFilterSortedProducts(filter, sorting) {
  //example of structure that these above arguments will posses
  //'filter' obj format ={"category":["smartphone","laptops"],"brand":['samsung','adad']}
  //'Sort' obj format ={_sort:"ratings",_order="asc"}
  //'pagination' obj format ={"page":2}
  let queryString = "";

  // converting all key:value pair of 'filter' obj into query string by concating each key:val pair

  //addind filter queries
  for (const key in filter) {
    queryString += `${key}=${filter[key][filter[key].length - 1]}&`;
  }
  //adding sorting queries
  for (const key in sorting) {
    queryString += `${key}=${sorting[key]}&`;
  }
  console.log(queryString);
  //calling api
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

// WHEN HANDLING MULTIPLE CATEGORIES
// for (const key in filter) {
//   queryString += `${key}=`;

//   for (let i = 0; i < filter[key].length; i++) {
//     const element = filter[key][i];
//     queryString += `${element},`;
//   }
//   queryString = queryString.replace(/.$/, "&");
// }
// console.log(queryString);
