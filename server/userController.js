import { Router } from "express";
import { User } from "./model/User.js";

export function UserController() {
  const router = new Router();

  router.get("/", async (req, res) => {
    const { sub } = req.query;
    res.json(await User.findOne({ sub }));
  });

  router.put("/", async (req, res) => {
    const { sub, bio } = req.body;
    await User.updateOne({ sub }, { bio });
    res.sendStatus(201);
  });
  return router;
}
