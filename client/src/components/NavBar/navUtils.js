export const calculateTotalQuantity = (cartItems) => {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return totalQuantity;
};
