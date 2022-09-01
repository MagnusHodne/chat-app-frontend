import { FAIcon } from "./basics";
import React from "react";

export function Avatar({ src }) {
  if (src === "")
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center rounded-full bg-green-800"
        }
      >
        <FAIcon icon={"fa-solid fa-user"} />
      </div>
    );
  return <img className={`rounded-full`} src={src} alt={""} />;
}
