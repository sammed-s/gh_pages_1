import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDownloadHTML,
  fetchDownloadReport,
  fetchDownloadSummary,
  fetchEmailNotification,
  fetchExcludeIncludeData,
  fetchSaveToRepository,
  fetchShareAnalysisPage,
} from "../actions/navbarActions";

const initialState = {
  data: {},
  isLoading: false,
  isSuccess: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchEmailNotification.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchEmailNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data["email_notification"] = action.payload;
    });
    builder.addCase(fetchEmailNotification.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.data["email_notification"] = {};
    });

    builder.addCase(fetchShareAnalysisPage.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchShareAnalysisPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data["share_analysis_page"] = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchShareAnalysisPage.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.data["share_analysis_page"] = {};
    });

    builder.addCase(fetchSaveToRepository.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchSaveToRepository.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data["save_to_repository"] = action.payload;
    });
    builder.addCase(fetchSaveToRepository.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.data["save_to_repository"] = {};
    });

    builder.addCase(fetchDownloadReport.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchDownloadReport.fulfilled, (state, action) => {
      state.isLoading = false;
      const { url, fileName } = action.payload;
      state.data["pdf_report"] = url;
      state.isSuccess = true;

      const link = document.createElement("a");
      link.href = url;
      const originalName =
        fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      link.setAttribute("download", `DB_Report_${originalName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    builder.addCase(fetchDownloadReport.rejected, (state) => {
      state.isLoading = false;
      state.data["pdf_report"] = null;
      state.isSuccess = false;
    });

    builder.addCase(fetchDownloadHTML.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchDownloadHTML.fulfilled, (state, action) => {
      state.isLoading = false;
      const { response, fileName } = action.payload;
      state.data["html_report"] = response;
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(response),
      );
      const originalName =
        fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      element.setAttribute("download", `DB_report_${originalName}.html`);
      document.body.appendChild(element);
      element.click();
      state.isSuccess = true;
    });
    builder.addCase(fetchDownloadHTML.rejected, (state) => {
      state.isLoading = false;
      state.data["html_report"] = null;
      state.isSuccess = false;
    });

    builder.addCase(fetchDownloadSummary.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchDownloadSummary.fulfilled, (state, action) => {
      state.isLoading = false;
      const { url, fileName } = action.payload;
      state.data["summary_report"] = url;
      state.isSuccess = true;

      const link = document.createElement("a");
      link.href = url;
      const originalName =
        fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      link.setAttribute("download", `DB_Summary_Report_${originalName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    builder.addCase(fetchDownloadSummary.rejected, (state) => {
      state.isLoading = false;
      state.data["summary_report"] = null;
      state.isSuccess = false;
    });

    builder.addCase(fetchExcludeIncludeData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchExcludeIncludeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data["exclude_include_data"] = action.payload;
    });
    builder.addCase(fetchExcludeIncludeData.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export default navbarSlice.reducer;
