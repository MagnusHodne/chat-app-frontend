import express from "express";
import bodyParser from "body-parser";
import { UserController } from "../userController.js";
import request from "supertest";
import { Message } from "../model/Message.js";
import { User } from "../model/User.js";

const app = express();

beforeAll(async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api/user", UserController());
});

describe("user controller", () => {
  it("can get the user info stored", async () => {
    const user = { sub: "1234abc", name: "Test-person", picture: "url" };
    const storedUser = new User(user);
    await storedUser.save();
    const res = await request(app)
      .get("/api/user")
      .query({ sub: user.sub })
      .expect(200);
    expect(res.body).toEqual(expect.objectContaining(user));
  });

  it("can update a user", async () => {
    const user = { sub: "1234abc", name: "Test-person", picture: "url" };
    const storedUser = new User(user);
    await storedUser.save();
    await request(app)
      .put("/api/user")
      .send({
        sub: "1234abc",
        bio: "This is my bio",
      })
      .expect(201);

    expect(await User.findOne({ sub: user.sub })).toEqual(
      expect.objectContaining({ bio: "This is my bio" })
    );
  });
});
