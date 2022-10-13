import { IMessage } from "../../types/IMessage";
import { useState } from "react";
import { Avatar } from "../avatar";
import { ChatMessageActions } from "./chatMessageActions";

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
      className={`hover:bg-brand-700 relative flex flex-row gap-4 pl-4`}
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

export { ChatMessage };
