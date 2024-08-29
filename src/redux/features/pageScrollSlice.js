import { createSlice } from "@reduxjs/toolkit";
import { fetchPageScrollImages } from "../actions/similarityActions";

const initialState = {
  data: [],
  isLoading: false,
};

export const pageScrollSlice = createSlice({
  name: "pagescroll",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPageScrollImages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPageScrollImages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPageScrollImages.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
    });
  },
});

export default pageScrollSlice.reducer;
