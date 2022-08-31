import React from "react";
import ReactDOM from "react-dom";
import { ProfilePage } from "../src/pages/profilePage";

describe("Profile page", () => {
  it("should match snapshot", () => {
    const element = document.createElement("div");
    const user = { name: "Test user", picture: "url" };
    ReactDOM.render(<ProfilePage user={user} />, element);
    expect(element).toMatchSnapshot();
  });
});
