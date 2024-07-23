import { createAsyncThunk } from "@reduxjs/toolkit";
import {Api} from "../../Api/Api";

export const getProjectModels = createAsyncThunk(
  "project/getProjectModels",
  async (projectId, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/project-models/${projectId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);