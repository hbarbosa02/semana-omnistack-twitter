import socketio from "socket.io-client";

const client = socketio("http://localhost:4000");

export default client;
