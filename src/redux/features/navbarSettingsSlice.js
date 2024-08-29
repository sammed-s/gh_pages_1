import { createSlice } from "@reduxjs/toolkit";
import { fetchNavbarSettings } from "../actions/navbarActions";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
};

export const navbarSettingsSlice = createSlice({
  name: "navbarsettings",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNavbarSettings.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchNavbarSettings.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(fetchNavbarSettings.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export default navbarSettingsSlice.reducer;
