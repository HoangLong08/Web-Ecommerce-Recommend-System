import { createSlice } from "@reduxjs/toolkit";
// current: immer
const formProductsSlice = createSlice({
  name: "formProduct",
  initialState: {
    thumbnail: {},
    images: [],
    description: "",
    price: "", // if not option price
    specifications: [], // array contain object label and value
    name: "",
    inventory: "",
    category: "", // idCategory
    brand: "", // idBrand
    isOption: false,
    listOption: [], // If the product has a selection, that option contains objects of {nameAttribute,listOptionChild: []}
    isDiscount: false,
    discount: "",
    errors: {},
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },

    setOptions: (state, action) => {
      const newArr = action.payload.map((itemOption) => {
        return {
          nameAttr: itemOption.nameOption,
          listOptionChild: itemOption.attribute.map((itemChild) => {
            return {
              nameOption: itemChild.nameAttribute,
              price: itemChild.priceAttribute,
            };
          }),
        };
      });
      state.listOption = newArr;
    },

    setIsOption: (state, action) => {
      state.isOption = action.payload;
    },

    setPrice: (state, action) => {
      state.price = action.payload;
    },

    setInventory: (state, action) => {
      state.inventory = action.payload;
    },

    setThumbnail: (state, action) => {
      state.thumbnail = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },

    setImages: (state, action) => {
      state.images = [...state.images, ...action.payload];
    },

    setDeleteImage: (state, action) => {
      state.images = state.images.filter(
        (item, index) => index !== action.payload
      );
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setBrand: (state, action) => {
      state.brand = action.payload;
    },

    setIsDiscountForm: (state, action) => {
      state.isDiscount = action.payload;
    },

    setAddOption: (state, action) => {
      // add configuration object to list option
      if (state.listOption.length === 0) {
        state.listOption = [action.payload];
      } else {
        state.listOption = [...state.listOption, action.payload];
      }
    },

    setRemoveOption: (state, action) => {
      let newArr = [];
      newArr = state.listOption.filter(
        (item, index) => index !== action.payload
      );
      state.listOption = newArr;
    },

    setAddOptionChild: (state, action) => {
      state.listOption = state.listOption.map((item, index) => {
        if (action.payload === index) {
          return {
            ...item,
            listOptionChild: [
              ...item.listOptionChild,
              { nameOption: "", price: "" },
            ],
          };
        }
        return item;
      });
    },

    setRemoveOptionChild: (state, action) => {
      const { indexOption, indexOptionChild } = action.payload;
      state.listOption = state.listOption.map((item, index) => {
        if (index === indexOption) {
          return {
            ...item,
            listOptionChild: item.listOptionChild.filter(
              (itemOptionChild, indexOptionChild_) =>
                indexOptionChild !== indexOptionChild_
            ),
          };
        }
        return item;
      });
    },

    setValueNameAttr: (state, action) => {
      state.listOption = state.listOption.map((item, index) => {
        if (action.payload.index === index) {
          return {
            ...item,
            nameAttr: action.payload.value,
          };
        }
        return item;
      });
    },

    setValueOptionChild: (state, action) => {
      const { indexAttr, indexOption, valueNameOption, valuePrice } =
        action.payload;
      state.listOption = state.listOption.map((item, index) => {
        if (index === indexAttr) {
          return {
            ...item,
            listOptionChild: item.listOptionChild.map(
              (itemOptionChild, indexOptionChild_) => {
                if (indexOption === indexOptionChild_) {
                  return {
                    ...itemOptionChild,
                    nameOption: valueNameOption,
                    price: valuePrice,
                  };
                }
                return itemOptionChild;
              }
            ),
          };
        }
        return item;
      });
    },

    setDiscount: (state, action) => {
      state.discount = action.payload;
    },

    setSpecifications: (state, action) => {
      state.specifications = action.payload;
    },

    setAddSpecifications: (state, action) => {
      state.specifications = [...state.specifications, action.payload];
    },

    setRemoveSpecifications: (state, action) => {
      let newArr = [];
      newArr = state.specifications.filter(
        (item, index) => index !== action.payload
      );
      state.specifications = newArr;
    },

    setValueSpecifications: (state, action) => {
      const { indexSpec, valueLabel, valueSpec } = action.payload;
      state.specifications = state.specifications.map((item, index) => {
        if (indexSpec === index) {
          return {
            ...item,
            label: valueLabel,
            value: valueSpec,
          };
        }
        return item;
      });
    },
  },

  extraReducers: {},
});

export const {
  setName,
  setPrice,
  setInventory,
  setThumbnail,
  setDescription,
  setImages,
  setDeleteImage,
  setCategory,
  setBrand,
  setIsOption,
  setIsDiscountForm,
  setOptions,
  setAddOption,
  setRemoveOption,
  setAddOptionChild,
  setRemoveOptionChild,
  setValueNameAttr,
  setValueOptionChild,
  setDiscount,
  setSpecifications,
  setAddSpecifications,
  setRemoveSpecifications,
  setValueSpecifications,
} = formProductsSlice.actions;

export default formProductsSlice.reducer;
