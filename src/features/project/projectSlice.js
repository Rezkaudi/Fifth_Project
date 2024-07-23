import { createSlice } from "@reduxjs/toolkit";
import { getProjectModels } from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  projectData: null,
  projectModels: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    fun: (state) => {},
  },
  extraReducers: (builder) => {
    // getProjectModels
    builder
      .addCase(getProjectModels.pending, (state, { payload }) => {
        state.projectModels = null;
      })
      .addCase(getProjectModels.fulfilled, (state, { payload }) => {
        state.projectModels = payload;
        toast.success(payload.message);
      })
      .addCase(getProjectModels.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});



export const {fun} = projectSlice.actions;
export default projectSlice.reducer;
