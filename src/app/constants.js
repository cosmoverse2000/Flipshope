export const ITEMS_PER_PAGE = +12;
export const ORDERS_PER_PAGE = +5;
export const discountedPrice = (product) => {
  return Math.round(product.price * (1 - product.discountPercentage / 100), 2);
};
