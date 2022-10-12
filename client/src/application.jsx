import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { FrontPage } from "./pages/frontPage";
import {
  ErrorComponent,
  LoadingComponent,
} from "./components/feedbackComponents";
import { useLoading } from "./lib/useLoading";
import { LoginPage } from "./pages/loginPage";
import { LoginForm } from "./components/loginForm";
import { ChatApiContext } from "./chatApiContext";
import { UserContext } from "./userContext";
import { useAuth0 } from "@auth0/auth0-react";

export function Application() {
  const { isLoading, user } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      setUserInfo(user);
    }
  }, [isLoading, user]);
  //Storing user as a global variable

  if (isLoading) {
    return <LoadingComponent message={"Fetching user data, please wait..."} />;
  }

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginForm />} />
          <Route path={"/*"} element={<FrontPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
