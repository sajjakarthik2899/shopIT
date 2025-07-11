import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {}
};
const usersSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        setCartItem: (state, action) => {
            const item = action.payload;
            console.log("Adding item to cart:", item);
            const isItemExists = state.cartItems.find(cartItem => cartItem.product === item.product);
            if (isItemExists) {
                state.cartItems = state.cartItems.map(cartItem =>
                    cartItem.product === item.product ? item : cartItem
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeCartItem: (state, action) => {
            const itemId = action.payload.product;
            console.log("Removing item from cart:", itemId);
            state.cartItems = state.cartItems.filter(cartItem => cartItem.product !== itemId);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingInfo: (state, action) => {
            const shippingInfo = action.payload;
            console.log("Saving shipping info:", shippingInfo);
            localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
        }
    }
});

export default usersSlice.reducer;
export const { setCartItem, removeCartItem, saveShippingInfo } = usersSlice.actions;
