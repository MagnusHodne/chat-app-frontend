import React from "react";
import { Content, Header, Sidebar } from "../components/layoutComponents";

export function GenericPage({ sidebarContent, mainContent }) {
  return (
    <div
      className={
        "grid h-[95vh] grid-cols-[25%_75%] grid-rows-[5em_1fr] gap-0 overflow-clip rounded-3xl p-2"
      }
    >
      <Header />
      <Sidebar content={sidebarContent} />
      <Content content={mainContent} />
    </div>
  );
}
