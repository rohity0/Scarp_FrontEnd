import axios from "axios";

export const scrapData = async (data) => {
  try {

    let url = `${process.env.REACT_APP_URL}/scrap`;
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

export const fetchData = async (currentPage, limit = 10) => {
  try {
    let url = `${process.env.REACT_APP_URL}/list?page=${currentPage}&limit=${limit}`;
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
    let url = `${process.env.REACT_APP_URL}/delete`;
    let response = await axios({
      url: url,
      method: "put",
      data: data,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const fetchDataById = async (id) => {
  try {
    let url = `${process.env.REACT_APP_URL}/get/${id}`;
    let response = await axios({
      url: url,
      method: "Get",
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
