import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
      year: "2023",
      month: "all",
      
      
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectYear: (state,action) =>{
      state.year = action.payload
  },
  selectMonth: (state,action) =>{
      state.month = action.payload
  },
  },
 
}); 




export const { selectMonth, selectYear, setAvatar, setUsername } = appSlice.actions;

export default appSlice.reducer;