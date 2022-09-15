import React from "react";

export function LoadingComponent({ message = "Loading, please wait..." }) {
  return (
    <div
      className={"loading-component flex h-full items-center justify-center"}
    >
      <div className={"flex flex-row items-center gap-2"}>
        <span className={"fa-solid fa-spinner fa-spin-pulse"} />
        <p>{message}</p>
      </div>
    </div>
  );
}

export function ErrorComponent({ error }) {
  return (
    <div className={"error-component"}>
      <div id={"error-text"}>{error.toString()}</div>
    </div>
  );
}
