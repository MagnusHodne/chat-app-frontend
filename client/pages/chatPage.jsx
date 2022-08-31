import React, { useContext, useEffect, useState } from "react";
import { useLoading } from "../lib/useLoading";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { FAIcon } from "../components/basics";
import { ChatApiContext } from "../chatApiContext";

function ChatConnection({ initialMessages, user }) {
  const [messages, setMessages] = useState(initialMessages);
  const [ws, setWs] = useState({});

  //Establishes a websocket on component mount
  useEffect(() => {
    const protocol = window.location.protocol;
    const ws = new WebSocket(
      (protocol === "http:" ? "ws://" : "wss://") + window.location.host
    );
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onmessage = (event) => {
      const { user, message, created, _id } = JSON.parse(event.data);
      setMessages((messages) => [...messages, { message, user, created, _id }]);
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message) {
    ws.send(JSON.stringify({ message, user }));
  }

  return <ChatComponent messages={messages} onNewMessage={handleNewMessage} />;
}

export function ChatPage({ user }) {
  const { fetchChatLog } = useContext(ChatApiContext);
  const { data, loading, error } = useLoading(fetchChatLog);
  if (loading)
    return <LoadingComponent message={"Fetching chat log, please wait..."} />;
  if (error)
    return (
      <ErrorComponent error={"Unable to fetch messages, please try again"} />
    );
  return <ChatConnection user={user} initialMessages={data} />;
}

function ChatHeader({ name }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FAIcon icon={"fa-solid fa-hashtag"} />
      <h3>{name}</h3>
    </div>
  );
}

function ChatMessage({ message, user, created, _id }) {
  const date = new Date(created);
  const { deleteMessage } = useContext(ChatApiContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "0.8em",
      }}
    >
      <div
        style={{
          display: "flex",
          gridGap: "1em",
          paddingBottom: "0.2em",
        }}
      >
        <strong>{user.name}</strong>
        <small
          style={{ fontSize: "0.8em", color: "var(--light)" }}
        >{`${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`}</small>
      </div>
      {message}
      <button
        onClick={async () => {
          await deleteMessage(_id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export function ChatComponent({ messages, onNewMessage }) {
  const [message, setMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }
  return (
    <div className={"chatWindow"}>
      <ChatHeader name={"main"} />
      <div className={"scroll"}>
        {messages.map(({ message, user, created, _id }, index) => (
          <ChatMessage
            message={message}
            user={user}
            created={created}
            _id={_id}
            key={`msg-${index}`}
          />
        ))}
      </div>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            placeholder={"Say something!"}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button>Send</button>
        </form>
      </footer>
    </div>
  );
}
