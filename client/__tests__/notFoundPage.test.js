import React from "react";
import ReactDOM from "react-dom";
import { NotFoundPage } from "../src/pages/notFoundPage";

describe("NotFoundPage", () => {
  it("matches snapshot", () => {
    const element = document.createElement("div");
    ReactDOM.render(<NotFoundPage />, element);
    expect(element).toMatchSnapshot();
  });
});
