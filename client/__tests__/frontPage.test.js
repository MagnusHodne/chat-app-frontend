import React from "react";
import ReactDOM from "react-dom";
import { FrontPage } from "../pages/frontPage";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("Front page", () => {
  it("matches snapshot for no user", async () => {
    const element = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <FrontPage />
        </MemoryRouter>,
        element
      );
    });

    expect(element).toMatchSnapshot();
  });

  it("matches snapshot for given user", async () => {
    const element = document.createElement("div");
    const user = { name: "Test user" };
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <FrontPage user={user} />
        </MemoryRouter>,
        element
      );
    });
    expect(element).toMatchSnapshot();
  });
});
