import axios from "axios";
import { BASE_URL } from "../../constant/resource/constant";
import { END_POINTS } from "../../utils/EndPoints";
const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
  }
  return req;
});

export const similarityData = (paperId) =>
  API.get(END_POINTS.ANALYSIS_GATEWAY + END_POINTS.GET_SIMILARITY + paperId);

export const sourceBodyData = ({ qKey, paperId }) => {
  return API.get(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.ANALYSIS_VERSION +
      paperId +
      "/" +
      qKey,
  );
};

export const sourceMatch = ({ qKey, paperId }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY + END_POINTS.ANALYSIS + paperId + "/" + qKey,
  );

export const pageScrollViewImages = ({ qKey, paperId }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY + END_POINTS.IMAGE_PATH + paperId + "/" + qKey,
  );
export const aiData = ({ qKey, paperId }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY + END_POINTS.AI_VERSION + paperId + "/" + qKey,
  );

export const excludeSource = ({ data, paperId }) =>
  API.post(END_POINTS.ANALYSIS_GATEWAY + END_POINTS.EXCLUDE_SOURCE + paperId, {
    excludeSource: data,
  });

export const includeSource = ({ data, paperId }) =>
  API.post(END_POINTS.ANALYSIS_GATEWAY + END_POINTS.INCLUDE_SOURCE + paperId, {
    includeSource: data,
  });

// Navbar API's

//Email Notification
export const emailNotification = ({ paperId, qKey, data }) =>
  API.post(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.EMAIL_NOTIFICATION +
      paperId +
      "/" +
      qKey,
    {
      email: data,
    },
  );

// Share Analysis Page ::
export const shareAnalysisPage = ({ paperId, data }) =>
  API.post(
    END_POINTS.ANALYSIS_GATEWAY + END_POINTS.SHARE_ANALYSIS_PAGE + paperId,
    {
      email: data,
    },
  );

// save to repository
export const saveToRepository = ({ paperId, qKey, data }) =>
  API.post(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.SAVE_REPOSITORY +
      paperId +
      "/" +
      qKey,
    {
      name: data.name,
      title: data.title,
      year: data.year,
    },
  );

// Download report
export const downloadReport = ({ paperId, qKey }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.DOWNLOAD_REPORT +
      paperId +
      "/" +
      qKey,
    {
      responseType: "blob",
    },
  );

// Download HTML
export const downloadHtml = ({ paperId, qKey }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.DOWNLOAD_HTML_REPORT +
      paperId +
      "/" +
      qKey,
  );

// Download summary
export const downloadSummary = ({ paperId, qKey }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.DOWNLOAD_SUMMARY +
      paperId +
      "/" +
      qKey,
    {
      responseType: "blob",
    },
  );

// navbar settings
export const navbarSettings = ({ paperId, qKey }) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.GET_SETTINGS_DETAIL +
      paperId +
      "/" +
      qKey,
  );

export const navbarExcludeIncludeSource = ({
  paperId,
  qKey,
  excludeIncludeFlag,
}) =>
  API.get(
    END_POINTS.ANALYSIS_GATEWAY +
      END_POINTS.PLAGIARISM_SETTINGS +
      paperId +
      "/" +
      qKey +
      "/" +
      excludeIncludeFlag,
  );
