import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  items: savedCart,
};

const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    // ==========================
    // ADD TO CART
    // ==========================
    addToCart(state, action) {

      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {

        if (existingItem.quantity < existingItem.availableStock) {

          existingItem.quantity++;

        } else {

          alert(
            `Only ${existingItem.availableStock} item(s) available in stock.`
          );

        }

      } else {

        state.items.push({

          ...action.payload,

          quantity: 1,

          // Store available stock separately
          availableStock: action.payload.quantity,

        });

      }

      saveCart(state.items);

    },

    // ==========================
    // INCREASE QUANTITY
    // ==========================
    increaseQty(state, action) {

      const item = state.items[action.payload];

      if (item.quantity < item.availableStock) {

        item.quantity++;

      } else {

        alert(
          `Maximum available stock is ${item.availableStock}`
        );

      }

      saveCart(state.items);

    },

    // ==========================
    // DECREASE QUANTITY
    // ==========================
    decreaseQty(state, action) {

      const item = state.items[action.payload];

      if (item.quantity > 1) {

        item.quantity--;

      } else {

        state.items.splice(action.payload, 1);

      }

      saveCart(state.items);

    },

    // ==========================
    // REMOVE ITEM
    // ==========================
    removeItem(state, action) {

      state.items.splice(action.payload, 1);

      saveCart(state.items);

    },

    // ==========================
    // CLEAR CART
    // ==========================
    checkout(state) {

      state.items = [];

      saveCart(state.items);

    },

  },

});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  checkout,
} = cartSlice.actions;

export default cartSlice.reducer;