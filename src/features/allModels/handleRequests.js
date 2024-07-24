import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../Api/Api";
// creatModel,getAllUserModels,

export const creatModel = createAsyncThunk(
  "models/creatModel",
  async (modelData, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${userToken}`,
        },
        body: modelData,
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.log(data)
        return rejectWithValue(data.Error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUserModels = createAsyncThunk(
  "models/getAllUserModels",
  async (_, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/user-model/`, {
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

export const deleteModel = createAsyncThunk(
  "models/deleteModel",
  async (modelName, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/delete/${modelName}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // const data = await response.json();

      if (response.ok) {
        return {modelName };
      } else {
        return rejectWithValue("error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
