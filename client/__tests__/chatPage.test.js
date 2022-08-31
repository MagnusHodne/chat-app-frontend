import React from "react";
import ReactDOM from "react-dom";
import { ChatPage } from "../src/pages/chatPage";
import { act, Simulate } from "react-dom/test-utils";
import { ChatApiContext } from "../src/chatApiContext";
import { ChatComponent } from "../src/components/chatComponents";

describe("Chat form", () => {
  const messages = [
    {
      message: "Test message",
      user: { name: "Test user" },
      created: Date.now(),
    },
  ];
  it("Submits the message", async () => {
    const element = document.createElement("div");
    const onSubmit = jest.fn();
    await act(async () => {
      ReactDOM.render(
        <ChatComponent messages={messages} onNewMessage={onSubmit} />,
        element
      );
    });
    Simulate.change(element.querySelector("form input"), {
      target: { value: "Test message" },
    });

    Simulate.submit(element.querySelector("div footer form"));
    expect(onSubmit).toBeCalledWith("Test message");
  });
});

describe("Chat page", () => {
  it("displays loading when no data", async () => {
    const element = document.createElement("div");
    const fetchChatLog = () => new Promise(() => {});
    const user = { name: "Test user" };
    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider
          value={{
            fetchChatLog,
          }}
        >
          <ChatPage user={user} />
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector(".loading-component")).not.toBeNull();
  });
  it("shows error message", async () => {
    const element = document.createElement("div");
    const fetchChatLog = () => {
      throw new Error("Failed to fetch");
    };
    const user = { name: "Test user" };
    await act(async () => {
      ReactDOM.render(
        <ChatApiContext.Provider
          value={{
            fetchChatLog,
          }}
        >
          <ChatPage user={user} />
        </ChatApiContext.Provider>,
        element
      );
    });
    expect(element.querySelector("#error-text").innerHTML).not.toBeNull();
  });
});
