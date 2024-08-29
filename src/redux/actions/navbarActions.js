import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  downloadHtml,
  downloadReport,
  downloadSummary,
  emailNotification,
  navbarExcludeIncludeSource,
  navbarSettings,
  saveToRepository,
  shareAnalysisPage,
} from "../api";
import { fetchSimilarityData, fetchSourceMatch } from "./similarityActions";

export const fetchEmailNotification = createAsyncThunk(
  "navbar/emailnotification",
  async (data) => {
    const paperId = sessionStorage.getItem("paperId");
    const qKey = sessionStorage.getItem("qKey");
    const response = await emailNotification({ paperId, qKey, data });
    return response.data;
  },
);

export const fetchShareAnalysisPage = createAsyncThunk(
  "navbar/shareanalysispage",
  async (data) => {
    const paperId = sessionStorage.getItem("paperId");
    const response = await shareAnalysisPage({ paperId, data });
    return response.data;
  },
);

export const fetchSaveToRepository = createAsyncThunk(
  "navbar/savetorepository",
  async (data) => {
    const paperId = sessionStorage.getItem("paperId");
    const qKey = sessionStorage.getItem("qKey");
    const response = await saveToRepository({ paperId, qKey, data });
    return response.data;
  },
);

export const fetchDownloadReport = createAsyncThunk(
  "navbar/downloadreport",
  async (data) => {
    const response = await downloadReport(data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const { fileName } = data;
    return { url, fileName };
  },
);

export const fetchDownloadHTML = createAsyncThunk(
  "navbar/downloadhtml",
  async (data) => {
    let { fileName } = data;
    const response = await downloadHtml(data);
    return { response: response.data, fileName };
  },
);

export const fetchDownloadSummary = createAsyncThunk(
  "navbar/downloadsummary",
  async (data) => {
    const response = await downloadSummary(data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const { fileName } = data;
    return { url, fileName };
  },
);

export const fetchNavbarSettings = createAsyncThunk(
  "navbarsettings/excludeInclude",
  async (data) => {
    const response = await navbarSettings(data);
    return response.data;
  },
);

export const fetchExcludeIncludeData = createAsyncThunk(
  "navbar/excludeincludesources",
  async (flag, { dispatch }) => {
    const data = {
      paperId: sessionStorage.getItem("paperId"),
      qKey: sessionStorage.getItem("qKey"),
      excludeIncludeFlag: flag,
    };
    const response = await navbarExcludeIncludeSource(data);

    if (response.status === 200) {
      await dispatch(fetchSourceMatch(data));
      await dispatch(fetchSimilarityData(data.paperId));
    }

    return response.data;
  },
);
