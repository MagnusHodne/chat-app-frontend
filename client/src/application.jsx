import { Route, Routes } from "react-router-dom";
import React from "react";
import { FrontPage } from "./pages/frontPage";
import {
  ErrorComponent,
  LoadingComponent,
} from "./components/feedbackComponents";
import { LoginForm } from "./components/loginForm";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginCallback } from "./pages/loginCallback";

export function Application() {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return <LoadingComponent message={"Authenticating user, please wait..."} />;
  }

  if (error) {
    return (
      <ErrorComponent error={`Error during authentication: ${error.message}`} />
    );
  }
  return (
    <Routes>
      <Route path={"/"} element={<LoginForm />} />
      <Route path={"/oauth2/callback"} element={<LoginCallback />} />
      <Route path={"/*"} element={<FrontPage />} />
    </Routes>
  );
}
