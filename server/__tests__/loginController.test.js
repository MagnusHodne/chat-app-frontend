import request from "supertest";
import express from "express";
import { LoginController } from "../loginController.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

beforeAll(async () => {
  const result = { config: { userinfo_endpoint: "test.endpoint" } };
  const fetchFunc = jest.fn(() => result);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser("test_secret"));
  app.use("/api/login", LoginController({ fetchFunc }));
});

describe("login controller", () => {
  it("has a login endpoint", async () => {
    await request(app)
      .post("/api/login/google")
      //.query({ provider: "google" })
      .send({ access_token: "dummytoken" })
      .expect(200);
  });

  it("has a userinfo endpoint", async () => {
    await request(app).get("/api/login").expect(200);
  });

  it("has a logout endpoint", async () => {
    const expected = [
      expect.stringContaining("google_access_token=;"),
      expect.stringContaining("github_access_token=;"),
      expect.stringContaining("azure_access_token=;"),
    ];
    const res = await request(app)
      .delete("/api/login")
      .set("Cookie", [
        "google_access_token=google",
        "github_access_token=github",
        "azure_access_token=azure",
      ])
      .expect(200);
    expect(res.headers["set-cookie"]).toEqual(expect.arrayContaining(expected));
  });

  it("calls fetchUser for Google", async () => {
    const res = await request(app)
      .post("/api/login/google")
      .send({ access_token: "dummytoken" })
      .expect(200);
    await request(app)
      .get("/api/login")
      .set("Cookie", res.headers["set-cookie"])
      .expect(200);
  });

  it("calls fetchUser for ActiveDirectory", async () => {
    const res = await request(app)
      .post("/api/login/azure")
      .send({ access_token: "dummytoken" })
      .expect(200);
    await request(app)
      .get("/api/login")
      .set("Cookie", res.headers["set-cookie"])
      .expect(200);
  });
});
