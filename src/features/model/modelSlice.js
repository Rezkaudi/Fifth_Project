import { createSlice } from "@reduxjs/toolkit";
import {
  getAllModelData,
  getModelFields,
  deleteModelRow,
  updateModelRow,
  createModelRow,
} from "./handleRequests";

import { toast } from "react-toastify";

// getAllModelData,getModelFields,deleteModelRow,updateModelRow,createModelRow

const initialState = {
  modelData: null,
  modelFields: null,
  stateOfCreate: false,
  loading: false,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    fn: (state) => {},
  },
  extraReducers: (builder) => {
    // getAllModelData
    builder
      .addCase(getAllModelData.pending, (state, { payload }) => {
        state.modelData = null;
      })
      .addCase(getAllModelData.fulfilled, (state, { payload }) => {
        state.modelData = payload;
        // toast.success("successfull getAllModelData");
      })
      .addCase(getAllModelData.rejected, (state, { payload }) => {
        toast.error("error");
      });

    // getModelFields
    builder
      .addCase(getModelFields.pending, (state, { payload }) => {
        state.modelFields = null;
      })
      .addCase(getModelFields.fulfilled, (state, { payload }) => {
        state.modelFields = payload;
        // toast.success("successfull getModelFields");
      })
      .addCase(getModelFields.rejected, (state, { payload }) => {
        toast.error("error");
      });

    // deleteModelRow
    builder
    .addCase(deleteModelRow.pending, (state, { payload }) => {
      state.loading = true;
    })
      .addCase(deleteModelRow.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.modelData = state.modelData?.filter((item) => {
          return item.id !== payload.rowId;
        });
        toast.success("successfull deleteModelRow");
      })
      .addCase(deleteModelRow.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // updateModelRow
    builder
      .addCase(updateModelRow.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateModelRow.fulfilled, (state, { payload }) => {
        state.loading = false;
        // const index = state.modelData.findIndex(
        //   (item) => item.id === payload.rowId
        // );

        // if (index !== -1) {
        //   state.modelData[index] = payload.rowData;
        // }
        toast.success("successful updateModelRow");
      })
      .addCase(updateModelRow.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    // createModelRow
    builder
      .addCase(createModelRow.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(createModelRow.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.modelData = [...state.modelData, payload.rowData];
        toast.success("successfull createModelRow");
      })
      .addCase(createModelRow.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const { fn } = modelSlice.actions;
export default modelSlice.reducer;
