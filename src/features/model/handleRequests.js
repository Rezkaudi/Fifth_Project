import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../Api/Api";

// getAllModelData,getModelFields,deleteModelRow,updateModelRow,createModelRow

export const getAllModelData = createAsyncThunk(
  "model/getAllModelData",
  async (modelName, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/data/${modelName}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const data = await response.json();
      console.log(data)
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

export const getModelFields = createAsyncThunk(
  "model/getModelFields",
  async (modelName, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/fields/${modelName}/`, {
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

export const deleteModelRow = createAsyncThunk(
  "model/deleteModelRow",
  async ({ modelName, rowId }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/edit/${modelName}/${rowId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });

      // const data = await response.json();

      if (response.ok) {
        return { rowId };
      } else {
        return rejectWithValue("error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createModelRow = createAsyncThunk(
  "model/createModelRow",
  async ({ modelName, rowData }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/data-enter/${modelName}/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${userToken}`,
        },
        body: rowData,
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        return { data, rowData };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateModelRow = createAsyncThunk(
  "model/updateModelRow",
  async ({ modelName, rowId, rowData }, { rejectWithValue }) => {
    console.log(rowData);
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/edit/${modelName}/${rowId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${userToken}`,
        },
        body: rowData,
      });
      // const data = await response.json();

      if (response.ok) {
        return { rowId, rowData };
      } else {
        const data = await response.json();
        console.log("ghith",data);

        return rejectWithValue(data.Error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllModelDataSpecify = createAsyncThunk(
  "model/getAllModelDataSpecify",
  async (modelName, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/data/${modelName}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue("error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
