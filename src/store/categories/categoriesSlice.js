import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/categories?limit=5`);
      return res.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
