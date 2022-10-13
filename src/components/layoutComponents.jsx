import React, { useContext } from "react";
import { Button, FAIcon } from "./basics";
import { ChatApiContext } from "../chatApiContext";
import { UserContext } from "../userContext";
import { LogoutButton } from "./loginForm";
import { useAuth0 } from "@auth0/auth0-react";

export function Content({ content }) {
  return <div className={"bg-brand-600 min-h-0"}>{content}</div>;
}
export function PaddedContent({ content, className }) {
  return <div className={`p-4 ${className}`}>{content}</div>;
}

function UserActions() {
  const { isAuthenticated } = useAuth0();

  return <>{isAuthenticated && <LogoutButton />}</>;
}
export function Header() {
  return (
    <header
      className={
        "border-brand-900 bg-brand-600 col-span-2 flex flex-row items-center justify-between border-b-2 border-solid p-4"
      }
    >
      <div className={"flex flex-row items-center gap-3"}>
        <FAIcon icon={"fa-solid fa-gamepad"} />
        <h1 className={"text-2xl font-black"}>Thischord</h1>
      </div>
      <div>
        <UserActions />
      </div>
    </header>
  );
}

export function Sidebar({ content }) {
  return <div className={"bg-brand-800 p-2"}>{content}</div>;
}
