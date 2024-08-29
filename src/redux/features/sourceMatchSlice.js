import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSourceMatch,
  fetchExcludeSources,
  fetchIncludeSources,
} from "../actions/similarityActions";

const initialState = {
  data: {},
  isLoading: false,
  isSuccess: false,
};

export const sourceMatchSlice = createSlice({
  name: "sourcematch",
  initialState,
  reducers: {
    originalFileName: (state) => {
      return state.data?.submission?.original_fn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSourceMatch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSourceMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSourceMatch.rejected, (state) => {
      state.isLoading = false;
      state.data = {};
    });

    builder.addCase(fetchExcludeSources.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchExcludeSources.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.sourceListParent = action.payload.sourceListParent;
      state.isSuccess = true;
    });
    builder.addCase(fetchExcludeSources.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });

    builder.addCase(fetchIncludeSources.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchIncludeSources.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.sourceListParent = action.payload.sourceListParent;
      state.isSuccess = true;
    });
    builder.addCase(fetchIncludeSources.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const originalFileName = (state) =>
  state.sourcematch?.data?.submission?.original_fn;

export default sourceMatchSlice.reducer;
