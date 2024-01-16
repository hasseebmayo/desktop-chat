import io, { Socket } from "socket.io-client";

const PATH = "http://localhost:5000";
export const socket: Socket = io(PATH!);
