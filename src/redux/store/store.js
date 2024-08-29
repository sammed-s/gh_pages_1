import { configureStore } from "@reduxjs/toolkit";
import similarityReducer from "../features/similaritySlice";
import sourceBodyReducer from "../features/sourceBodySlice";
import sourceMatchReducer from "../features/sourceMatchSlice";
import pageScrollReducer from "../features/pageScrollSlice";
import aiDataReducer from "../features/aiDataSlice";
import navbarReducer from "../features/navbarSlice";
import navbarSettingsReducer from "../features/navbarSettingsSlice";

export const store = configureStore({
  reducer: {
    similarity: similarityReducer,
    sourcebody: sourceBodyReducer,
    sourcematch: sourceMatchReducer,
    pagescroll: pageScrollReducer,
    aidata: aiDataReducer,
    navbar: navbarReducer,
    navbarsettings: navbarSettingsReducer,
  },
});
