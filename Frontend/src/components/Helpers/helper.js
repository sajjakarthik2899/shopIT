export const calculateOrderCost = (cartItems) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 10;
    const tax = Number((subtotal * 0.1).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    return { subtotal, shipping, tax, total };
};
