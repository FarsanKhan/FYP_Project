import { useStore } from "./store";

export const getUser = () => {
  return useStore((state) => state.user);
};
