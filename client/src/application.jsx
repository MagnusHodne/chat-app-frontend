import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FrontPage } from "./pages/frontPage";
import { LoadingComponent } from "./components/feedbackComponents";
import { LoginForm } from "./components/loginForm";
import { UserContext } from "./userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginCallback } from "./pages/loginCallback";

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
          <Route
            path={"/oauth2/callback"}
            element={<LoginCallback setUserInfo={setUserInfo} />}
          />
          <Route path={"/*"} element={<FrontPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
