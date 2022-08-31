import React from "react";
import ReactDOM from "react-dom";
import { Content, Header, Sidebar } from "../src/components/layoutComponents";
import { BrowserRouter } from "react-router-dom";

let element;
beforeEach(() => {
  element = document.createElement("div");
});

describe("Header", () => {
  it("matches snapshot with no user", () => {
    ReactDOM.render(<Header />, element);
    expect(element).toMatchSnapshot();
  });

  it("matches snapshot with a user", () => {
    ReactDOM.render(
      <BrowserRouter>
        <Header user={{ name: "Test user" }} />
      </BrowserRouter>,
      element
    );
    expect(element).toMatchSnapshot();
  });
});

describe("Sidebar", () => {
  it("matches snapshot", () => {
    ReactDOM.render(<Sidebar />, element);
  });
  expect(element).toMatchSnapshot();
});

describe("Content", () => {
  it("matches snapshot", () => {
    ReactDOM.render(<Content />, element);
  });
  expect(element).toMatchSnapshot();
});
