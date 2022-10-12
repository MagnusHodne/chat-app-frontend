import React, { useEffect } from "react";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type CallbackProps = {
  setUserInfo: (userInfo: any) => void;
};

export const LoginCallback: React.FC<CallbackProps> = ({ setUserInfo }) => {
  const { error, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processLogin = async () => {
      const accessToken = await getAccessTokenSilently();
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", accessToken);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);

      //TODO - make call to new user endpoint here, let backend handle registration if new user
      //await CallBackendApi("user/new", "post", user)

      navigate("/home");
    };
    processLogin();
  });

  if (error) {
    return (
      <ErrorComponent
        error={`Failed to redirect from login: ${error.message}`}
      />
    );
  }
  return <LoadingComponent message={"Redirecting, please wait..."} />;
};
