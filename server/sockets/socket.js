import { io } from "socket.io-client";

const socket = io(
  "http://localhost:5000"
);

export default socket;git add .
git commit -m "Setup Socket.IO client connection"