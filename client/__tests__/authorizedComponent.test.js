import React from "react";
import ReactDOM from "react-dom";
import { AuthorizedComponent } from "../src/components/authorizedComponent";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { ChatApiContext } from "../src/chatApiContext";

let element;
beforeEach(() => {
  element = document.createElement("div");
});

describe("AuthorizedComponent", () => {
  it("uses an authorization function", async () => {
    const verifyUser = jest.fn(() => false);

    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <ChatApiContext.Provider value={{ verifyUser }}>
            <AuthorizedComponent user={{ name: "test-user" }} />
          </ChatApiContext.Provider>
        </MemoryRouter>,
        element
      );
    });

    expect(verifyUser).toHaveBeenCalled();
    expect(element.innerHTML).toMatchSnapshot();
    expect(element.querySelector("p").innerHTML).toContain("Redirect");
  });

  it("returns the content on successful authorization", async () => {
    const verifyUser = jest.fn(() => true);
    function TestElement() {
      return <div className={".test-component"}>Test success component</div>;
    }
    await act(async () => {
      ReactDOM.render(
        <BrowserRouter>
          <ChatApiContext.Provider value={{ verifyUser }}>
            <AuthorizedComponent
              successComponent={<TestElement />}
              user={{ name: "test-user" }}
            />
          </ChatApiContext.Provider>
        </BrowserRouter>,
        element
      );
    });

    expect(verifyUser).toHaveBeenCalled();
    expect(element.innerHTML).toMatchSnapshot();
    expect(element.querySelector("div").innerHTML).toContain(
      "Test success component"
    );
  });
});
