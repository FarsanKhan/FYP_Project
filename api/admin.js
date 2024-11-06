import queryString from "query-string";
import axios from "./axios";

export const getAllUsers = async (filters) =>
  await axios
    .get("/admin/users?" + queryString.stringify(filters, { skipNull: true }))
    .then((res) => res.data);

export const disableUser = async (id) =>
  await axios.put(`/admin/users/${id}/disable`);

export const enableUser = async (id) =>
  await axios.put(`/admin/users/${id}/enable`);

export const getAllReports = async (filters) =>
  await axios
    .get("/admin/reports?" + queryString.stringify(filters, { skipNull: true }))
    .then((res) => res.data);

export const getReportDetails = async (id) =>
  await axios.get("/admin/reports/" + id).then((res) => res.data);

export const deleteReport = async (id) =>
  await axios.delete("/admin/reports/" + id);

export const disableReportEntity = async (body) =>
  await axios.put("/admin/reports/disable-entity", body);

export const enableReportEntity = async (body) =>
  await axios.put("/admin/reports/enable-entity", body);

export const getAnalyticsCount = async (filters) =>
  await axios
    .get(
      "/admin/analytics/count?" +
        queryString.stringify(filters, { skipNull: true })
    )
    .then((res) => res.data);

export const getAnalyticsUsersByDay = async (filters) =>
  await axios
    .get(
      "/admin/analytics/breakdown-users?" +
        queryString.stringify(filters, { skipNull: true })
    )
    .then((res) => res.data);

export const getAnalyticsJobsByDay = async (filters) =>
  await axios
    .get(
      "/admin/analytics/breakdown-jobs?" +
        queryString.stringify(filters, { skipNull: true })
    )
    .then((res) => res.data);
