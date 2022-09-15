import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
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

export function Application() {
  const { fetchLogin } = useContext(ChatApiContext);
  //Storing user as a global variable
  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (loading) {
    return <LoadingComponent message={"Fetching user data, please wait..."} />;
  }

  return (
    <UserContext.Provider value={{ user: data?.user }}>
      <BrowserRouter>
        <Routes>
          <Route path={"/startlogin"} element={<LoginForm />} />
          <Route path={"/*"} element={<FrontPage />} />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data?.config} reload={reload} />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
