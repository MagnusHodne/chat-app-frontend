import { useContext, useEffect } from "react";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ChatApiContext } from "../chatApiContext";

export const LoginCallback = () => {
  const { error, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { registerLogin } = useContext(ChatApiContext);
  useEffect(() => {
    const processLogin = async () => {
      //TODO - make call to new user endpoint here, let backend handle registration if new user
      await registerLogin(user, await getAccessTokenSilently());

      navigate("/app");
    };
    processLogin().then();
  }, []);

  if (error) {
    return (
      <ErrorComponent
        error={`Failed to redirect from login: ${error.message}`}
      />
    );
  }
  return <LoadingComponent message={"Redirecting, please wait..."} />;
};
