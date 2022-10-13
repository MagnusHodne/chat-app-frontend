import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Login, LoginCallback, Logout } from "../src/legacy/loginPage";
import { MemoryRouter } from "react-router-dom";
import { ChatApiContext } from "../src/chatApiContext";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockedUsedNavigate,
  };
});

let element;
beforeEach(() => {
  element = document.createElement("div");
});

describe("Login", () => {
  it("should show loading component before redirect", async () => {
    const handleLogin = () => new Promise(() => {});
    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider value={{ handleLogin }}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector(".loading-component")).not.toBeNull();
  });

  it("shows error if unable to redirect", async () => {
    const handleLogin = () => {
      throw new Error("Failed to fetch");
    };
    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider value={{ handleLogin }}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector("#error-text").innerHTML).not.toBeNull();
  });
});

describe("Logout", () => {
  it("should show loading component before redirect", async () => {
    const endSession = () => new Promise(() => {});
    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider value={{ endSession }}>
          <MemoryRouter>
            <Logout />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector(".loading-component")).not.toBeNull();
  });
});

describe("LoginCallback", () => {
  it("shows error component if bad state", async () => {
    const registerLogin = jest.fn().mockResolvedValue();
    const getCallbackParameters = () => {
      return {};
    };
    const getExpectedState = () => {
      return "";
    };

    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider
          value={{ registerLogin, getCallbackParameters, getExpectedState }}
        >
          <MemoryRouter>
            <LoginCallback />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });

    expect(element.querySelector("#error-text").innerHTML).toContain(
      "Unexpected state"
    );
  });

  it("shows error component if given error from auth provider", async () => {
    const expectedState = "state";
    const registerLogin = jest.fn().mockResolvedValue();
    const getCallbackParameters = () => {
      return {
        error: "This is the error",
        state: expectedState,
      };
    };
    const getExpectedState = () => {
      return expectedState;
    };

    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider
          value={{ registerLogin, getCallbackParameters, getExpectedState }}
        >
          <MemoryRouter>
            <LoginCallback />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector("#error-text").innerHTML).toContain(
      "This is the error"
    );
  });

  it("shows error component if no token", async () => {
    const expectedState = "state";
    const registerLogin = jest.fn().mockResolvedValue();
    const getCallbackParameters = () => {
      return {
        state: expectedState,
      };
    };
    const getExpectedState = () => {
      return expectedState;
    };

    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider
          value={{ registerLogin, getCallbackParameters, getExpectedState }}
        >
          <MemoryRouter>
            <LoginCallback />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector("#error-text").innerHTML).toContain(
      "Missing access_token"
    );
  });

  it("redirects after successful login", async () => {
    const expectedState = "state";
    const registerLogin = jest.fn().mockResolvedValue();
    const reload = jest.fn();
    const getCallbackParameters = () => {
      return {
        state: expectedState,
        access_token: "token",
      };
    };
    const getExpectedState = () => {
      return expectedState;
    };

    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider
          value={{ registerLogin, getCallbackParameters, getExpectedState }}
        >
          <MemoryRouter>
            <LoginCallback reload={reload} />
          </MemoryRouter>
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(reload).toHaveBeenCalled();
  });
});
