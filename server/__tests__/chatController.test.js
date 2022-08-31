import express from "express";
import bodyParser from "body-parser";
import { ChatController, handleChatMessage } from "../chatController.js";
import request from "supertest";
import { Message } from "../model/Message.js";

const app = express();

beforeAll(async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api/chat", ChatController());
});

describe("chat controller", () => {
  it("has a get all endpoint", async () => {
    await request(app).get("/api/chat").expect(200);
  });

  it("has a function for storing new messages in database", async () => {
    const message = {
      message: "This is the message",
      user: { sub: "asdf", name: "Test-user" },
    };
    await handleChatMessage(JSON.stringify(message));
    expect(await Message.find()).toHaveLength(1);
  });

  it("has a delete endpoint", async () => {
    const message = {
      message: "This is the message",
      user: { sub: "asdf", name: "Test-user" },
    };
    await handleChatMessage(JSON.stringify(message));
    const storedMessage = await Message.findOne();
    await request(app)
      .delete("/api/chat")
      .send({ _id: storedMessage._id })
      .expect(204);
    expect(await Message.find()).toHaveLength(0);
  });
});
