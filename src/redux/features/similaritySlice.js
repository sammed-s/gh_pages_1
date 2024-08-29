import { createSlice } from "@reduxjs/toolkit";
import { fetchSimilarityData } from "../actions/similarityActions";

const initialState = {
  data: {},
  isLoading: false,
};

export const similaritySlice = createSlice({
  name: "similaritydata",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchSimilarityData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSimilarityData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSimilarityData.rejected, (state) => {
      state.isLoading = false;
      state.data = {};
    });
  },
});

export default similaritySlice.reducer;
