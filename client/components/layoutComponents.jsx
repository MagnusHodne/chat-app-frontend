import React, { useContext } from "react";
import { Button, FAIcon } from "./basics";
import { ChatApiContext } from "../chatApiContext";

export function Content({ content }) {
  return <div className={"content"}>{content}</div>;
}

function UserActions({ user }) {
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
export function Header({ user }) {
  return (
    <header className={"header"}>
      <div className={"title"}>
        <FAIcon icon={"fa-solid fa-gamepad"} />
        <h1>Thischord</h1>
      </div>
      <div>
        <UserActions user={user} />
      </div>
    </header>
  );
}

export function Sidebar({ content }) {
  return <div className={"sidebar"}>{content}</div>;
}
