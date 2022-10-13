import React, { useState } from "react";
import { Button, FAIcon } from "./basics";
import { Avatar } from "./avatar";
import { PaddedContent } from "./layoutComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { IUser } from "../types/user";
import { IMessage } from "../types/message";

const paddingLeft = "pl-4";

export function ChatHeader({ name }: { name: string }) {
  return (
    <div className={`flex flex-row items-center gap-2 ${paddingLeft}`}>
      <FAIcon icon={"fa-solid fa-hashtag"} />
      <h3 className={"font-black"}>{name}</h3>
    </div>
  );
}

function ChatMessageAction({
  icon,
  onClick,
  className,
}: {
  icon: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`hover:bg-brand-500 border-none px-2 py-1 ${className}`}
      onClick={() => onClick()}
    >
      <FAIcon icon={icon} />
    </button>
  );
}

function ChatMessageActions({
  author,
  handleDelete,
}: {
  author: IUser;
  handleDelete: () => void;
}) {
  const { user } = useAuth0();
  const userIsAuthor = author.sub === user?.sub;
  return (
    <div
      className={
        "border-brand-800 bg-brand-600 absolute right-2 top-0 -translate-y-1/2 flex-row items-center justify-center self-end overflow-clip rounded border border-solid"
      }
    >
      <ChatMessageAction
        icon={"fa-solid fa-heart"}
        className={"hover:text-amber-500"}
        onClick={() => alert("Not yet implemented")}
      />

      {userIsAuthor && (
        <>
          <ChatMessageAction
            icon={"fa-solid fa-pencil"}
            className={"hover:text-lime-500"}
            onClick={() => alert("Not yet implemented")}
          />
          <ChatMessageAction
            icon={"fa-solid fa-trash-can"}
            onClick={() => handleDelete()}
            className={"text-red-600 hover:bg-red-600 hover:text-white"}
          />
        </>
      )}
    </div>
  );
}

function ChatMessage({
  message,
  onDeleteMessage,
  displayInfo,
}: {
  message: IMessage;
  onDeleteMessage: (id: string) => void;
  displayInfo: boolean;
}) {
  const created = new Date(message.created);
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let date;
  if (
    now.getMonth() === created.getMonth() &&
    now.getFullYear() === created.getFullYear()
  ) {
    if (now.getDate() === created.getDate()) {
      date = "Today at";
    }
  } else if (yesterday.getDate() === created.getDate()) {
    date = "Yesterday at";
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
      className={`relative flex flex-row gap-4 ${paddingLeft} hover:bg-brand-700`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`mt-2 w-10 p-0 ${displayInfo && "h-10"}`}>
        {displayInfo && <Avatar src={message.user.picture} />}
      </div>
      <div className={"flex flex-col"}>
        {showActions && (
          <ChatMessageActions
            author={message.user}
            handleDelete={() => onDeleteMessage(message._id)}
          />
        )}
        {displayInfo && (
          <div className={"mt-2 flex gap-2 pb-0"}>
            <div className={"inline-block"}>
              <span className={"font-extrabold hover:underline"}>
                {message.user.name}
              </span>
            </div>

            <div className={"inline-block"}>
              <span className={"text-xs font-light text-[#99aab5]"}>
                {`${date} ${hours}:${minutes}`}
              </span>
            </div>
          </div>
        )}
        <div className={"py-0.5 px-0"}>{message.message}</div>
      </div>
    </div>
  );
}

export function ChatComponent({
  messages,
  onNewMessage,
  onDeleteMessage,
  chatRoom = "main",
}: {
  messages: IMessage[];
  onNewMessage: (message: string) => void;
  onDeleteMessage: (id: string) => void;
  chatRoom?: string;
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }

  return (
    <PaddedContent
      className={"grid h-full grid-rows-[3em_1fr_auto] pl-0"}
      content={
        <>
          <ChatHeader name={chatRoom} />
          <div className={"scrollbar overflow-y-auto overflow-x-hidden pt-3"}>
            {messages.map((message, index) => {
              let displayInfo = false;
              if (index === 0) {
                displayInfo = true;
              } else if (messages[index - 1].user.sub !== message.user.sub) {
                displayInfo = true;
              } else if (
                new Date(message.created).getTime() -
                  new Date(messages[index - 1].created).getTime() >
                1000 * 3600
              ) {
                displayInfo = true;
              }

              return (
                <ChatMessage
                  message={message}
                  displayInfo={displayInfo}
                  key={message._id}
                  onDeleteMessage={onDeleteMessage}
                />
              );
            })}
          </div>
          <footer>
            <form
              className={`m-0 flex h-full flex-row items-stretch gap-1 ${paddingLeft}`}
              onSubmit={handleSubmit}
            >
              <input
                className={
                  "bg-brand-500 placeholder:text-brand-300 flex-1 rounded border-none px-3 py-0"
                }
                autoFocus={true}
                placeholder={`Message #${chatRoom}`}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <Button title={"Send"} className={"m-0 h-full"} />
            </form>
          </footer>
        </>
      }
    />
  );
}
