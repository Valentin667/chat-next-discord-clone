import { io } from "socket.io-client";

export const socket = io("valentinjullien.alwaysdata.net", {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log("event received", event, args);
});
