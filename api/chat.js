import queryString from "query-string";
import axios from "./axios";

export const getChats = async (filters) =>
  await axios
    .get("/chats?" + queryString.stringify(filters, { skipNull: true }))
    .then((res) => res.data);

export const getChat = async (id) =>
  await axios.get("/chats/" + id).then((res) => res.data);

export const sendMessage = async ({ id, ...data }) =>
  await axios.post("/chats/" + id, data);

export const deleteChat = async (id) => await axios.delete("/chats/" + id);

export const makeChat = async (data) =>
  await axios.post("/chats", data).then((res) => res.data);

export const readMessages = async (id) =>
  await axios.put("/chats/" + id + "/messages/read");
