import axios from "axios";

export const scrapData = async (data) => {
  try {
    console.log(data);
    let url = `http://localhost:9000/scrap`;
    let response = await axios({
      url: url,
      data: data,
      method: "Post",
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const fetchData = async (data) => {
  try {
    console.log(data);
    let url = `http://localhost:9000/list`;
    let response = await axios({
      url: url,
      method: "Get",
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const deleteData = async (data) => {
  try {
    let url = `http://localhost:9000/delete`;
    let response = await axios({
      url: url,
      method: "Post",
      data: data,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const fetchDataById = async (id) => {
  try {
    let url = `http://localhost:9000/get/${id}`;
    let response = await axios({
      url: url,
      method: "Get",
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
