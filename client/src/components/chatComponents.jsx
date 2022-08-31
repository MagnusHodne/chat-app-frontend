import React, { useContext, useState } from "react";
import { Button, FAIcon } from "./basics";
import { UserContext } from "../userContext";

export function ChatHeader({ name }) {
  return (
    <div className={"chat-header flex gap-2"}>
      <FAIcon icon={"fa-solid fa-hashtag"} />
      <h3>{name}</h3>
    </div>
  );
}

function ChatMessageActions({ author, handleDelete }) {
  const { user } = useContext(UserContext);
  const userIsAuthor = author.sub === user.sub;
  return (
    <div className={"message-actions"}>
      <button
        className={"message-action"}
        onClick={() => alert("Not yet implemented")}
      >
        <FAIcon icon={"fa-solid fa-heart"} />
      </button>
      {userIsAuthor && (
        <>
          <button
            className={"message-action"}
            onClick={() => alert("Not yet implemented")}
          >
            <FAIcon icon={"fa-solid fa-pencil"} />
          </button>
          <button className={"message-action"} onClick={() => handleDelete()}>
            <FAIcon icon={"fa-solid fa-trash-can"} className={"has-danger"} />
          </button>
        </>
      )}
    </div>
  );
}

function ChatMessage({ message, info, onDeleteMessage, displayInfo }) {
  const created = new Date(info.created);
  let date;
  if (Date.now() - created.getTime() < 1000 * 3600 * 24) {
    date = "Today";
  } else if (Date.now() - created.getTime() < 1000 * 3600 * 48) {
    date = "Yesterday";
  } else {
    date = created.toDateString();
  }
  const hours =
    created.getHours() < 10 ? `0${created.getHours()}` : created.getHours();
  const minutes =
    created.getMinutes() < 10
      ? `0${created.getMinutes()}`
      : created.getMinutes();
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={"message-container"}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showActions && (
        <ChatMessageActions
          author={info.user}
          handleDelete={() => onDeleteMessage(info._id)}
        />
      )}
      {displayInfo && (
        <div className={"message-info"}>
          <strong>{info.user.name}</strong>
          <small className={"message-time"}>
            {`${date} ${hours}:${minutes}`}
          </small>
        </div>
      )}
      <div className={"message-text"}>{message}</div>
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
        {messages.map(({ message, user, created, _id }, index) => {
          let displayInfo = false;
          if (index === 0) {
            displayInfo = true;
          } else if (messages[index - 1].user.sub !== user.sub) {
            displayInfo = true;
          } else if (
            new Date(created).getTime() -
              new Date(messages[index - 1].created).getTime() >
            1000 * 3600
          ) {
            displayInfo = true;
          }

          return (
            <ChatMessage
              message={message}
              info={{ user, created, _id }}
              displayInfo={displayInfo}
              key={_id}
              onDeleteMessage={onDeleteMessage}
            />
          );
        })}
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
          <Button title={"Send"} />
        </form>
      </footer>
    </div>
  );
}
