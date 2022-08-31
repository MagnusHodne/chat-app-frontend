import React from "react";
import ReactDOM from "react-dom";
import { Button } from "../components/basics";
import { Simulate } from "react-dom/test-utils";

let element;
beforeEach(() => {
  element = document.createElement("div");
});

describe("Button", () => {
  it("matches snapshot", () => {
    ReactDOM.render(
      <Button title={"Test button"} icon={"fa-solid fa-comment"} />,
      element
    );
    expect(element).toMatchSnapshot();
  });
  it("calls the onclick function", () => {
    const onClick = jest.fn();

    ReactDOM.render(
      <Button
        title={"Test button"}
        icon={"fa-solid fa-comment"}
        onClick={onClick}
      />,
      element
    );
    Simulate.click(element.querySelector("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
