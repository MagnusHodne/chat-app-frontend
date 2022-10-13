import React from "react";
import { Content, Header, Sidebar } from "../components/layoutComponents";

export function GenericPage({ sidebarContent, mainContent }) {
  return (
    <div
      className={
        "m-2 grid h-full grid-cols-[25%_75%] grid-rows-[5em_1fr] gap-0 overflow-clip rounded p-0"
      }
    >
      <Header />
      <Sidebar>{sidebarContent}</Sidebar>
      <Content>{mainContent}</Content>
    </div>
  );
}
