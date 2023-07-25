export const calculateTotal = (cartItems) => {
  const updatedTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return updatedTotal.toFixed(2);
};

export const removeCartItem = (cartItems, _id) =>
  cartItems.filter((item) => item._id !== _id);

export const syncCartStorage = (cartItems) => {
  if (cartItems.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    localStorage.removeItem("cart");
  }
};

export const addToCart = (product, quantity) => {
  const cartItem = {
    ...product,
    quantity,
  };

  let cart = getCartFromStorage() || [];
  let isCartEmpty = cart.length === 0;

  if (isCartEmpty) {
    cart.push(cartItem);
    syncCartStorage(cart);
    return;
  }

  const existingItem = cart.find((item) => item._id === cartItem._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  syncCartStorage(cart);
};

export const getCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};
