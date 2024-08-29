import { createSlice } from "@reduxjs/toolkit";
import { fetchAiMatch } from "../actions/aiActions";

const initialState = {
  aiData: "",
  isLoadingAI: false,
};

export const aiContentSlice = createSlice({
  name: "aidata",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAiMatch.pending, (state) => {
      state.isLoadingAI = true;
    });
    builder.addCase(fetchAiMatch.fulfilled, (state, action) => {
      state.isLoadingAI = false;
      state.aiData = action.payload;
    });
    builder.addCase(fetchAiMatch.rejected, (state) => {
      state.isLoadingAI = false;
      state.aiData = "";
    });
  },
});

export default aiContentSlice.reducer;
