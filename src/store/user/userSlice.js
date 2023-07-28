import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';

const setLocalStorage = (payload) => {
  localStorage.setItem('email', payload.email);
  localStorage.setItem('password', payload.password);
};

export const createUser = createAsyncThunk(
  'createUser/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);

      setLocalStorage(payload);

      return res.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  'createUser/loginUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);

      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });

      setLocalStorage(payload);

      return login.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);

      setLocalStorage(payload);

      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  currentUser: null,
  cart: [],
  isLoading: false,
  formType: 'signup',
  showForm: false,
  textInAler: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];

      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }

      state.cart = newCart;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    changeTypeForm: (state, { payload }) => {
      state.formType = payload;
    },
    addTextAlert: (state, { payload }) => {
      state.textInAler = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
      state.textInAler = 'User was created';
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
      state.textInAler = 'User was login';
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
      state.textInAler = 'The user has been updated';
    });
  },
});

export const {
  addItemToCart,
  toggleForm,
  changeTypeForm,
  removeItemFromCart,
  addTextAlert,
} = userSlice.actions;

export default userSlice.reducer;
