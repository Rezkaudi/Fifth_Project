import { createSlice } from "@reduxjs/toolkit";
import {
  creatProject,
  getAllUserProjects,
  deleteProject,
  // updateProject,
  getProjectModels,
} from "./handleRequests";
import { toast } from "react-toastify";

// creatProject , getAllUserProjects , updateProject , deleteProject , getProjectModels

const initialState = {
  userProjects: null,
  userProjectModels: null,
  stateOfCreate: false,
  loading: false,
};

export const allProjectsSlice = createSlice({
  name: "userProjects",
  initialState,
  reducers: {
    fun: (state) => {},
  },
  extraReducers: (builder) => {
    // creatProject
    builder
      .addCase(creatProject.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(creatProject.fulfilled, (state, { payload }) => {
        state.userProjects = [...state.userProjects, payload];
        console.log(state.userProjects);
        state.loading = false;
        toast.success("successful creatProject");
      })
      .addCase(creatProject.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // getAllUserProjects
    builder
      .addCase(getAllUserProjects.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getAllUserProjects.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userProjects = payload;
        toast.success("successfull getAllUserProjects");
      })
      .addCase(getAllUserProjects.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error("error getAllUserProjects");
      });

    // deleteProject
    builder
      .addCase(deleteProject.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload)
        state.userProjects = state.userProjects.filter((item) => {
          return item.id !== payload.projectId;
        });
        toast.success("successfull deleteProject");
      })
      .addCase(deleteProject.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // getProjectModels
    builder
      .addCase(getProjectModels.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getProjectModels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userProjectModels = payload;
        toast.success("successfull getProjectModels");
      })
      .addCase(getProjectModels.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error("error getProjectModels");
      });
  },
});

export const { fun } = allProjectsSlice.actions;
export default allProjectsSlice.reducer;
