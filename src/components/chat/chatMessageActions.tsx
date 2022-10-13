import { FAIcon } from "../basics";
import { IUser } from "../../types/IUser";
import { useAuth0 } from "@auth0/auth0-react";

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

export function ChatMessageActions({
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
