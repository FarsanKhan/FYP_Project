import axios from "./axios";

export const getNotifications = async () =>
  await axios.get("/notifications").then((res) => res.data);

export const deleteNotification = async (id) =>
  await axios.delete("/notifications/" + id);

export const readNotifications = async (notificationIds) =>
  await axios.put("/notifications/read", notificationIds);

export const getNotificationCount = async () =>
  await axios.get("/notifications/unread").then((res) => res.data);
