import socketIOClient from "socket.io-client";

export const WS = import.meta.env.VITE_API_BASE_URL;
export const ws = socketIOClient(WS);
