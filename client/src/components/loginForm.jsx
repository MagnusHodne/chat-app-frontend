import React from "react";
import { Button } from "./basics";
import { Header } from "./layoutComponents";

export function LoginForm() {
  return (
    <div className={"page-fullsize"}>
      <Header />
      <div className={"content"}>
        <div className={"login-buttons"}>
          <h1>Welcome!</h1>
          <p>Please log in</p>
          <div
            style={{ display: "flex", flexDirection: "column", width: "15em" }}
          >
            <Button
              to={"/login/google"}
              title={"Log in with Google"}
              icon={"fa-brands fa-google"}
            />
            <Button
              to={"/login/azure"}
              title={"Log in with Active Directory"}
              icon={"fa-brands fa-microsoft"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
