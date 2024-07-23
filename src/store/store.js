import { configureStore } from "@reduxjs/toolkit";

// import all slice
import userSlice from "../features/user/userSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import projectSlice from "../features/project/projectSlice";
import modelSlice from "../features/model/modelSlice";
import allProjectsSlice from "../features/allProjects/allProjectsSlice";
import allModelsSlice from "../features/allModels/allModelsSlice";

// job: jobSlice,
export const store = configureStore({
  reducer: {
    user: userSlice,
    toggle: toggleSlice,
    project: projectSlice,
    model: modelSlice,
    allProjects: allProjectsSlice,
    allModels: allModelsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore the non-serializable value warnings
    }),
});
