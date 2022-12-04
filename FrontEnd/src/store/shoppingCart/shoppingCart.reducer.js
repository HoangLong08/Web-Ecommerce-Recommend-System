import { createSlice } from "@reduxjs/toolkit";
//current
const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

// function deepEqual(object1, object2) {
//   const keys1 = Object.keys(object1);
//   const keys2 = Object.keys(object2);
//   if (keys1.length !== keys2.length) {
//     return false;
//   }
//   for (const key of keys1) {
//     const val1 = object1[key];
//     const val2 = object2[key];
//     const areObjects = isObject(val1) && isObject(val2);
//     if (
//       (areObjects && !deepEqual(val1, val2)) ||
//       (!areObjects && val1 !== val2)
//     ) {
//       return false;
//     }
//   }
//   return true;
// }
// function isObject(object) {
//   return object != null && typeof object === "object";
// }

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    shoppingCart: shoppingCart || [],
  },
  reducers: {
    addProductInShoppingCart: (state, action) => {
      let res = [];
      if (state.shoppingCart.length === 0) {
        res = [...state.shoppingCart, { ...action.payload, quantity: 1 }];
      } else {
        // res =
        res = [...state.shoppingCart, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem("shoppingCart", JSON.stringify(res));
      state.shoppingCart = res;
    },

    removeProductInShoppingCart: (state, action) => {
      console.log("action.payload: ", action.payload);
      let res = state.shoppingCart.filter(
        (item, index) => index !== action.payload
      );
      state.shoppingCart = res;
      localStorage.setItem("shoppingCart", JSON.stringify(res));
    },

    removeAllProductInShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
      localStorage.setItem("shoppingCart", JSON.stringify(action.payload));
    },
  },

  extraReducers: {},
});

export const {
  addProductInShoppingCart,
  removeProductInShoppingCart,
  removeAllProductInShoppingCart,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
