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

function ChatMessageActions({ user, handleDelete }) {
  return (
    <div className={"message-actions"}>
      <div onClick={() => alert("Not yet implemented")}>Edit</div>
      <div onClick={() => handleDelete()}>Delete</div>
    </div>
  );
}

function ChatMessage({ message, user, created, _id, onDeleteMessage }) {
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
      <ChatMessageActions handleDelete={() => onDeleteMessage(_id)} />
    </div>
  );
}

/**
 *
 * @param messages List of messages
 * @param onNewMessage Function for handling saves
 * @param onDeleteMessage Function for handling deletes
 * @param chatRoom Name of the chat room
 * @returns {JSX.Element}
 * @constructor
 */
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
            onDeleteMessage={onDeleteMessage}
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
