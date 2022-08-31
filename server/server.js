import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { LoginController } from "./loginController.js";
import { fetchJSON } from "./fetchJSON.js";
import { WebSocketServer } from "ws";
import { ChatController, handleWebSocketMessage } from "./chatController.js";
import { UserController } from "./userController.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Init DB here
if (!process.env.MONGODB_URL) throw Error("No DB URL provided!");

mongoose.connect(
  process.env.MONGODB_URL,
  () => {
    console.log("Connected to MongoDB");
  },
  (e) => {
    console.error(e);
  }
);

//Init login controller here
app.use("/api/login", LoginController({ fetchFunc: fetchJSON }));

app.use("/api/chat", ChatController());
app.use("/api/user", UserController());

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const sockets = [];
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", async (msg) => handleWebSocketMessage(msg, sockets));
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      console.log("Connected WebSocket");
      wsServer.emit("connection", socket, req);
    });
  });
});
