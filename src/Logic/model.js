import { Api } from "../Api/Api";

export const createNewModel = async (modelData) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/create/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${userToken}`,
      },
      body: modelData,
    });

    // const data = await res.json()
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const getProjectModels = async (id) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/project-models/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data);
      return data;
    } else {
      console.log(data);
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const getModelData = async (modelName) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/data/${modelName}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data);
      return data;
    } else {
      console.log(data);
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const getFieldsModel = async (modelName) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/fields/${modelName}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      return data;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const deleteModel = async (modelName) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/delete/${modelName}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const addNewRowModel = async (rowData, modelName) => {
  const userToken = localStorage.getItem("userToken");
  console.log("ddddddd", rowData);

  try {
    const res = await fetch(`${Api}/data-enter/${modelName}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
      body: JSON.stringify(rowData),
    });

    const data = await res.json();
    if (res.ok) {
      return true;
    } else {
      console.log(data);
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const deleteRowModel = async (modelName, id) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/edit/${modelName}/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    // const data = await res.json()
    // console.log(data)

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};

export const updateRowModel = async (modelName, id, rowData) => {
  const userToken = localStorage.getItem("userToken");

  try {
    const res = await fetch(`${Api}/edit/${modelName}/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
      body: JSON.stringify(rowData),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(console.error(err));
  }
};
