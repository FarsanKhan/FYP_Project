import { create } from "zustand";

export const useStore = create((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  meeting: null,
  setUser: ({ accessToken, refreshToken, ...user }) =>
    set(() => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    }),
  setIncomingMeeting: (meeting) =>
    set(() => {
      return { meeting };
    }),
  updateUser: (user) =>
    set(() => {
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    }),
  removeUser: () =>
    set(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("viewMap");
      return { user: null };
    }),
}));
