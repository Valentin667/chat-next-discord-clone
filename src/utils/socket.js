import { io } from "socket.io-client";

export const socket = io("http://localhost:1234/", {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
    console.log("event received", event, args);
  });