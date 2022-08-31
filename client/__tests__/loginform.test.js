import React from "react";
import { LoginForm } from "../components/loginForm";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

describe("LoginForm", () => {
  it("matches snapshot", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
      element
    );
    expect(element).toMatchSnapshot();
  });
});
