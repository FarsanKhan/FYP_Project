import axios from "./axios";
import queryString from "query-string";

export const getPosts = async (filters) =>
  await axios
    .get("/posts?" + queryString.stringify(filters, { skipNull: true }))
    .then((res) => res.data);

export const createPost = async (data) => await axios.post("/posts", data);

export const updatePost = async ({ id, ...data }) =>
  await axios.put("/posts/" + id, data);

export const deletePost = async (id) => await axios.delete("/posts/" + id);
