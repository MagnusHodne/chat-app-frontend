import React from "react";
import { Content, Header, Sidebar } from "../components/layoutComponents";

export function GenericPage({ sidebarContent, mainContent, user }) {
  return (
    <div className={"page"}>
      <Header user={user} />
      <Sidebar content={sidebarContent} />
      <Content content={mainContent} />
    </div>
  );
}
