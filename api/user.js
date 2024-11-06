import axios from "./axios";

export const getUser = async (id) =>
  await axios.get("/users/" + id).then((res) => res.data);

export const resendVerification = async (data) =>
  await axios.post("/users/resend-verification", data);

export const verifyUser = async (data) =>
  await axios.post("/users/verify", data);

export const requestReset = async (data) =>
  await axios.post("/users/request-reset", data);

export const resetPassword = async (data) =>
  await axios.post("/users/reset-password", data);

export const emailCheck = async (data) =>
  await axios.post("/users/email-check", data);

export const register = async (data) =>
  await axios.post("/users/register", data);

export const login = async (data) => await axios.post("/users/login", data);

export const logout = async () => await axios.post("/users/logout");

export const followCompany = async (id) =>
  await axios.post("/users/follow/" + id);

export const unfollowCompany = async (id) =>
  await axios.post("/users/unfollow/" + id);

export const getUserFollowers = async (id) =>
  await axios.get("/users/followers/" + id).then((res) => res.data);

export const getCompanyFollowerStats = async (id) =>
  await axios.get("/users/follower-stats/" + id).then((res) => res.data);

export const getUserFeed = async () =>
  await axios.get("/users/feed").then((res) => res.data);

export const uploadUserImage = async (data) =>
  axios
    .post("/users/upload-image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const updateUser = async (data) =>
  axios.put("/users/update", data).then((res) => res.data);
