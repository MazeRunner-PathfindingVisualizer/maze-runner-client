import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'none',
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setMenu } = navSlice.actions;

export const selectMenu = (state) => state.nav.status;

export default navSlice.reducer;
