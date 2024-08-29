import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  excludeSource,
  includeSource,
  pageScrollViewImages,
  similarityData,
  sourceBodyData,
  sourceMatch,
} from "../api";

export const fetchSimilarityData = createAsyncThunk(
  "similaritydata/getSimilarityData",
  async (paperId) => {
    const response = await similarityData(paperId);
    return response.data;
  },
);

export const fetchSourceBody = createAsyncThunk(
  "sourcebody/getSourceBody",
  async (data) => {
    const response = await sourceBodyData(data);
    return response.data;
  },
);

export const fetchSourceMatch = createAsyncThunk(
  "sourcematch/getSourceMatch",
  async (data) => {
    const response = await sourceMatch(data);
    return response.data;
  },
);

export const fetchPageScrollImages = createAsyncThunk(
  "pagescroll/getPageScrollImages",
  async (data) => {
    const response = await pageScrollViewImages(data);
    return response.data;
  },
);

export const fetchExcludeSources = createAsyncThunk(
  "sourcematch/excludeSources",
  async (data) => {
    const paperId = sessionStorage.getItem("paperId");
    const response = await excludeSource({ data, paperId });
    return response.data;
  },
);

export const fetchIncludeSources = createAsyncThunk(
  "sourcematch/includeSources",
  async (data) => {
    const paperId = sessionStorage.getItem("paperId");
    const response = await includeSource({ data, paperId });
    return response.data;
  },
);