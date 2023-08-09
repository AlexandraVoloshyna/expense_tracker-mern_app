import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    clearCredentials: (state,) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;