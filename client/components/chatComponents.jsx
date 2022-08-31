import React, { useState } from "react";
import { FAIcon } from "./basics";

export function ChatHeader({ name }) {
  return (
    <div className={"chat-header"}>
      <FAIcon icon={"fa-solid fa-hashtag"} />
      <h3>{name}</h3>
    </div>
  );
}

function ChatMessageActions({ user }) {}

function ChatMessage({ message, user, created, _id, handleDelete }) {
  const date = new Date(created);

  return (
    <div className={"message-container"}>
      <div className={"message-info"}>
        <strong>{user.name}</strong>
        <small className={"message-time"}>
          {`${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`}
        </small>
      </div>
      {message}
      <button className={"message-actions"} onClick={() => handleDelete(_id)}>
        Delete
      </button>
    </div>
  );
}

export function ChatComponent({
  messages,
  onNewMessage,
  onDeleteMessage,
  chatRoom = "main",
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }

  return (
    <div className={"chat-window"}>
      <ChatHeader name={chatRoom} />
      <div className={"scroll"}>
        {messages.map(({ message, user, created, _id }) => (
          <ChatMessage
            message={message}
            user={user}
            created={created}
            key={_id}
            _id={_id}
            handleDelete={onDeleteMessage}
          />
        ))}
      </div>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            placeholder={`Message #${chatRoom}`}
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
