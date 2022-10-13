import React from "react";
import { Route, Routes } from "react-router-dom";
import { GenericPage } from "./genericPage";
import { ProfilePage } from "./profilePage";
import { ChatPage } from "./chatPage";
import { NotFoundPage } from "./notFoundPage";
import { Button } from "../components/basics";
import AuthorizedComponent from "../components/authorizedComponent";

export function FrontPage() {
  function ContentRouter() {
    return (
      <Routes>
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/chat"} element={<ChatPage />} />
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
    <AuthorizedComponent>
      <GenericPage
        mainContent={<ContentRouter />}
        sidebarContent={<SidebarContent />}
      ></GenericPage>
    </AuthorizedComponent>
  );
}
