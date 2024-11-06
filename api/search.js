import axios from "./axios";
import queryString from "query-string";

export const getSearchResults = async (filters) =>
  await axios
    .get("/search?" + queryString.stringify(filters))
    .then((res) => res.data);

export const getSearchCompanies = async (filters) =>
  await axios
    .get("/search/companies?" + queryString.stringify(filters))
    .then((res) => res.data);

export const getSearchPosts = async (filters) =>
  await axios
    .get("/search/posts?" + queryString.stringify(filters))
    .then((res) => res.data);
