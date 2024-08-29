import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiData } from "../api";

export const fetchAiMatch = createAsyncThunk(
  "aidata/getAiData",
  async (data) => {
    const response = await aiData(data);
    return response.data;
  },
);
