import React from "react";
import { Route, Routes } from "react-router-dom";
import { GenericPage } from "./genericPage";
import { ProfilePage } from "./profilePage";
import { ChatPage } from "./chatPage";
import { NotFoundPage } from "./notFoundPage";
import { Button } from "../components/basics";
import { AuthorizedComponent } from "../components/authorizedComponent";

export function FrontPage({ user }) {
  function ContentRouter({ user }) {
    return (
      <Routes>
        <Route path={"/profile"} element={<ProfilePage user={user} />} />
        <Route path={"/chat"} element={<ChatPage user={user} />} />
        <Route path={"/*"} element={<NotFoundPage />} />
      </Routes>
    );
  }

  function SidebarContent() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button title={"Profile"} icon={"fa-solid fa-user"} to={"/profile"} />
        <Button title={"Chat"} icon={"fa-solid fa-comment"} to={"/chat"} />
      </div>
    );
  }
  return (
    <AuthorizedComponent
      user={user}
      successComponent={
        <GenericPage
          user={user}
          mainContent={<ContentRouter user={user} />}
          sidebarContent={<SidebarContent user={user} />}
        ></GenericPage>
      }
    />
  );
}
