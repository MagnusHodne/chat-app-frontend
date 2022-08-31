import { Router } from "express";
import { Message } from "./model/Message.js";

export function ChatController() {
  const router = new Router();
  router.get("/", async (req, res) => {
    res.json(await Message.find());
  });
  return router;
}

export async function handleChatMessage(message) {
  const msg = JSON.parse(message);
  const entry = new Message({ message: msg.message, user: msg.user });
  return entry.save();
}
