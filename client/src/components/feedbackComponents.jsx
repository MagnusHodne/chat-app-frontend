import React from "react";

export function LoadingComponent({ message = "Loading, please wait..." }) {
  return (
    <div className={"h-full"}>
      <div className={"flex items-center justify-center"}>
        <span className={"fa-solid fa-spinner fa-spin-pulse"} />
        <p>{message}</p>
      </div>
    </div>
  );
}

export function ErrorComponent({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <div id={"error-text"}>{error.toString()}</div>
    </div>
  );
}
