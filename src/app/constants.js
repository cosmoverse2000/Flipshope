export const ITEMS_PER_PAGE = +12;
export const ORDERS_PER_PAGE = +5;

export const discountedPrice = (product) => {
  return Math.round(product.price * (1 - product.discountPercentage / 100), 2);
};

export const dateFormatter = (dateString) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-IN", options);

  return formattedDate;
};
