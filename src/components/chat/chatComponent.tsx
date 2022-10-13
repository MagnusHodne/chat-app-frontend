import { IMessage } from "../../types/message";
import React, { useState } from "react";
import { PaddedContent } from "../layoutComponents";
import { ChatHeader, ChatMessage } from "./index";
import { Button } from "../basics";

function ChatComponent({
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
              className={`m-0 flex h-full flex-row items-stretch gap-1 pl-4`}
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

export { ChatComponent };
