import axios from "../api/axios";

export const getAllItems = () => axios.get("/item");

export const getItemById = (id) => axios.get(`/item/byId/${id}`);

export const createItem = (formData) =>
  axios.post("/item/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
