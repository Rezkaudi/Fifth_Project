import { createSlice } from "@reduxjs/toolkit";
import { creatModel, getAllUserModels, deleteModel } from "./handleRequests";
import { toast } from "react-toastify";

// creatModel,getAllUserModels,deleteModel

const initialState = {
  userModels: null,
  stateOfCreate: false,
  loading: false,
};

export const allModelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    getAllProjectModels: (state, { payload }) => {
      let projectModels = state.userModels?.filter((item) => {
        return item.projectid === payload.projectid;
      });
      return projectModels;
    },
  },
  extraReducers: (builder) => {
    // creatModel
    builder
      .addCase(creatModel.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(creatModel.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.userModels = [...state.userModels, payload];
        toast.success("successfull creatModel");
      })
      .addCase(creatModel.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error("error");
      });

    // getAllUserModels
    builder
      .addCase(getAllUserModels.pending, (state, { payload }) => {
        state.userModels = null;
      })
      .addCase(getAllUserModels.fulfilled, (state, { payload }) => {
        state.userModels = payload;
        console.log(payload);
        toast.success("successful getAllUserModels");
      })
      .addCase(getAllUserModels.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    // deleteModel

    builder
      .addCase(deleteModel.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteModel.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userModels = state.userModels.filter((item) => {
          return item.modelname !== payload.modelName;
        });
        toast.success("successful deleteModel");
      })
      .addCase(deleteModel.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { getAllProjectModels } = allModelsSlice.actions;
export default allModelsSlice.reducer;
