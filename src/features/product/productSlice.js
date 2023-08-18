import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchFilterSortedProducts,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  addToProductList,
  updateSelectedProduct,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  categories: [],
  brands: [],
  slectedProduct: null,
};

//using redux thunk to call api functions(promises) then setting data into state
//this is an redux-action, when dipatched will call api and then setstate
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (amount) => {
    const response = await fetchAllProducts(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async (amount) => {
    const response = await fetchCategories(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async (amount) => {
    const response = await fetchBrands(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//just like all-products api func above , getting filtered products,sorting,page also now
export const fetchFilterSortedProductsAsync = createAsyncThunk(
  "product/fetchFilterSortedProducts",
  async ({ filter, sorting, page }) => {
    //executing filter api function and getting reasponse
    const response = await fetchFilterSortedProducts(filter, sorting, page);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response.data;
  }
);
//adding new product
export const addToProductListAsync = createAsyncThunk(
  "product/addToProductList",
  async (product) => {
    const response = await addToProductList(product);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);
export const updateSelectedProductAsync = createAsyncThunk(
  "product/updateSelectedProduct",
  async (updatedProduct) => {
    const response = await updateSelectedProduct(updatedProduct);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchFilterSortedProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilterSortedProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.slectedProduct = action.payload;
      })
      .addCase(addToProductListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToProductListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload);
        state.products.push(action.payload);
      })
      .addCase(updateSelectedProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSelectedProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotaItemsCount = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProducById = (state) => state.product.slectedProduct;

export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
