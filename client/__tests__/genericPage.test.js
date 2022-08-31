import React from "react";
import ReactDOM from "react-dom";
import { GenericPage } from "../pages/genericPage";
import { MemoryRouter } from "react-router-dom";

describe("GenericPage", () => {
  it("matches snapshot", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <GenericPage />
      </MemoryRouter>,
      element
    );
    expect(element).toMatchSnapshot();
  });
});
