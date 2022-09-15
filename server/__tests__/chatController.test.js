import express from "express";
import bodyParser from "body-parser";
import { ChatController } from "../chatController.js";
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
});
