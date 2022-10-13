import { useEffect } from "react";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const LoginCallback = () => {
  const { error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processLogin = async () => {
      //TODO - make call to new user endpoint here, let backend handle registration if new user
      //await CallBackendApi("user/new", "post", user)

      navigate("/app");
    };
    processLogin();
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
