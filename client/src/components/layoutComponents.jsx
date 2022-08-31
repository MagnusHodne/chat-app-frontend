import React, { useContext } from "react";
import { Button, FAIcon } from "./basics";
import { ChatApiContext } from "../chatApiContext";
import { UserContext } from "../userContext";

export function Content({ content }) {
  return <div className={"min-h-0 bg-thischord-700"}>{content}</div>;
}

function UserActions() {
  const { user } = useContext(UserContext);
  const { verifyUser } = useContext(ChatApiContext);
  if (!verifyUser(user)) {
    return <></>;
  }

  return (
    <>
      <Button to={"/login/endsession"} title={"Log out"} className={"danger"} />
    </>
  );
}
export function Header() {
  return (
    <header
      className={
        "col-span-2 flex flex-row items-center justify-between border-b-2 border-solid border-thischord-900 bg-thischord-700 p-4"
      }
    >
      <div className={"flex flex-row items-center gap-3"}>
        <FAIcon icon={"fa-solid fa-gamepad"} />
        <h1>Thischord</h1>
      </div>
      <div>
        <UserActions />
      </div>
    </header>
  );
}

export function Sidebar({ content }) {
  return <div className={"bg-thischord-800"}>{content}</div>;
}
