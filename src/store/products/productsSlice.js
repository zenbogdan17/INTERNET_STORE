import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';
import { shuffle } from '../../utils/common';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  list: [],
  filtered: [],
  related: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price <= payload);
    },
    getRelatedProduct: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);

      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    });
  },
});

export const { filterByPrice, getRelatedProduct } = productsSlice.actions;

export default productsSlice.reducer;
