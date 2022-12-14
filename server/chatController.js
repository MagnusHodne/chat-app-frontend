import { Router } from "express";
import { Message } from "./model/Message.js";
import { User } from "./model/User.js";

export function ChatController() {
  const router = new Router();
  router.get("/", async (req, res) => {
    res.json(await Message.find().populate("user"));
  });
  router.delete("/", async (req, res) => {
    const msg = req.body;
    await Message.deleteOne(msg);
    res.sendStatus(204);
  });
  return router;
}

async function saveMessage({ message, user }) {
  const storedUser = await User.findOne({ sub: user.sub });
  const entry = new Message({ message, user: storedUser._id });
  return entry.save();
}

async function deleteMessage({ _id }) {
  await Message.deleteOne({ _id });
}

export async function handleWebSocketMessage(msg, sockets) {
  const obj = JSON.parse(msg);
  if (obj.action === "create") {
    const { message, user } = obj;
    const { _id, created } = await saveMessage({ message, user });
    for (const recipient of sockets) {
      recipient.send(
        JSON.stringify({
          action: obj.action,
          message,
          created,
          user,
          _id,
        })
      );
    }
  } else if (obj.action === "delete") {
    const { _id } = obj;
    await deleteMessage({ _id });
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ action: obj.action, _id }));
    }
  }
}
