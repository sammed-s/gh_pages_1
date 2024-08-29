import { createSlice } from "@reduxjs/toolkit";
import { fetchSourceBody } from "../actions/similarityActions";

const initialState = {
  htmlData: "",
  isLoadingHtml: false,
  totalcount: 0,
};

export const sourcebodySlice = createSlice({
  name: "sourcebody",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchSourceBody.pending, (state) => {
      state.isLoadingHtml = true;
    });
    builder.addCase(fetchSourceBody.fulfilled, (state, action) => {
      state.isLoadingHtml = false;
      state.htmlData = action.payload;

      const parser = new DOMParser();

      const doc = parser.parseFromString(action.payload, "text/html");

      let count = 0;
      doc.querySelectorAll("*").forEach((element) => {
        Array.from(element.classList).forEach((className) => {
          if (className.startsWith("ak_shy_")) {
            count++;
          }
        });
      });
      state.totalcount = count;
    });
    builder.addCase(fetchSourceBody.rejected, (state) => {
      state.isLoadingHtml = false;
      state.htmlData = "";
    });
  },
});

export default sourcebodySlice.reducer;
