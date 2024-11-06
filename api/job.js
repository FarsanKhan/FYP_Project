import axios from "./axios";
import queryString from "query-string";

export const getJobs = async (filters) =>
  await axios
    .get("/jobs?" + queryString.stringify(filters, { skipNull: true }))
    .then((res) => res.data);

export const getJob = async (id) =>
  await axios.get("/jobs/" + id).then((res) => res.data);

export const postJob = async (data) => await axios.post("/jobs", data);

export const updateJob = async ({ id, ...data }) =>
  await axios.put("/jobs/" + id, data);

export const deleteJob = async (id) => await axios.delete("/jobs/" + id);

export const viewJob = async (data) => await axios.post("/jobs/view", data);

export const getJobAnalytics = async (id) =>
  await axios.get("/jobs/analytics/" + id).then((res) => res.data);

export const applyJob = async ({ id, formData: data }) =>
  await axios.post("/jobs/apply/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const jobFeedback = async ({ id, ...data }) =>
  await axios.post("/jobs/feedback/" + id, data);

export const reportJob = async ({ id, ...data }) =>
  await axios.post("/jobs/report/" + id, data);

export const getJobApplicants = async (id) =>
  await axios.get("/jobs/applicants/" + id).then((res) => res.data);

export const getJobFeedbacks = async (id) =>
  await axios.get("/jobs/feedbacks/" + id).then((res) => res.data);

export const removeJobFeedback = async ({ id, feedbackId }) =>
  await axios.delete("/jobs/feedbacks/" + id + "/" + feedbackId);

export const updateApplicantStatus = async ({ id, applicantID, ...data }) =>
  await axios.post("/jobs/applicants/" + id + "/" + applicantID, data);
