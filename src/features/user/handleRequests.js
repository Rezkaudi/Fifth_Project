import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../Api/Api";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData, { rejectWithValue }) => {
    const adminToken = process.env.REACT_APP_ADMIN_TOKEN;

    try {
      const response = await fetch(`${Api}/signup/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${adminToken}`,
        },
        body: userData,
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        let messages = [];
        Object.keys(data).forEach((key) => {
          data[key].forEach((message) => messages.push(`${key}: ${message}`));
        });
        console.log(messages);
        return rejectWithValue(messages);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (userData, { rejectWithValue }) => {
    const adminToken = process.env.REACT_APP_ADMIN_TOKEN;

    try {
      const response = await fetch(`${Api}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${adminToken}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userToken", data.token);
        return data;
      } else {
        let error =data.non_field_errors[0]
        return rejectWithValue(error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export const creatUserToken = createAsyncThunk(
  "user/creatUserToken",
  async (tokenData, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/signup2/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${userToken}`,
        },
        body: tokenData,
      });
      const data = await response.json();
      console.log(data);

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

export const getUserTokens = createAsyncThunk(
  "user/getUserTokens",
  async (_, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/tokens/`, {
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

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (tokenId, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/refresh-token/${tokenId}/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        return {data,tokenId};
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

