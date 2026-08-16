import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const initialState = {
  items: savedWishlist,
};

const saveWishlist = (items) => {
  localStorage.setItem("wishlist", JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist(state, action) {
      const index = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }

      saveWishlist(state.items);
    },

    removeWishlist(state, action) {
      state.items.splice(action.payload, 1);

      saveWishlist(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;