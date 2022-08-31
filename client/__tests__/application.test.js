import React from "react";
import ReactDOM from "react-dom";
import { Application } from "../src/application";

describe("Application", () => {
  it("renders correctly", () => {
    const element = document.createElement("div");
    ReactDOM.render(<Application />, element);
    expect(element).toMatchSnapshot();
  });
});

//See reference 10 for async test setup
