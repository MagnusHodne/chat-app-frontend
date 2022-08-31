import React from "react";
import { Content, Header, Sidebar } from "../components/layoutComponents";

export function GenericPage({ sidebarContent, mainContent }) {
  return (
    <div className={"page"}>
      <Header />
      <Sidebar content={sidebarContent} />
      <Content content={mainContent} />
    </div>
  );
}
