import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../Api/Api";

// creatProject , getAllUserProjects , updateProject , deleteProject , getProjectModels

export const creatProject = createAsyncThunk(
  "projects/creatProject",
  async (projectData, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/user-projects/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${userToken}`,
        },
        body: projectData,
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.log(data);
        return rejectWithValue(data["Error "]);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUserProjects = createAsyncThunk(
  "projects/getAllUserProjects",
  async (_, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/user-projects/`, {
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

export const getProjectModels = createAsyncThunk(
  "projects/getProjectModels",
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

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/edit-project/${projectId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // const data = await response.json();
      // console.log(data)

      if (response.ok) {
        return { projectId };
      } else {
        const data = await response.json();
        console.log(data);
        return rejectWithValue("error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, newProjectData }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${Api}/edit-project/${projectId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify(newProjectData),
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

// function formDataToObject(formData) {
//   const obj = {};
//   formData.forEach((value, key) => obj[key] = value);
//   return obj;
// }
