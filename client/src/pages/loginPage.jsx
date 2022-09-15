import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../lib/useLoading";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { ChatApiContext } from "../chatApiContext";

/**
 * Function that displays a waiting message to the user, posts the access_token to the server
 * (whichs signs it), then returns to the front page
 */
export function LoginCallback({ reload, config }) {
  const { provider } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const urlAfterLogin = "/chat";
  const { registerLogin, getCallbackParameters, getExpectedState } =
    useContext(ChatApiContext);

  useEffect(async () => {
    const { access_token, error, error_description, state, code } =
      getCallbackParameters();

    const expected_state = getExpectedState();
    if (!state || expected_state !== state) {
      setError("Unexpected state");
      return;
    }

    if (error || error_description) {
      setError(`Error: ${error} (${error_description})`);
      return;
    }

    if (code) {
      const { client_id, token_endpoint } = config[provider];
      const code_verifier = window.sessionStorage.getItem("code_verifier");
      const payload = {
        grant_type: "authorization_code",
        code,
        client_id,
        code_verifier,
        redirect_uri: `${window.location.origin}/login/${provider}/callback`,
      };
      const res = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams(payload),
      });
      if (!res.ok) {
        setError(`Failed to fetch token ${res.status}: ${await res.text()}`);
        return;
      }
      const { access_token } = await res.json();
      await registerLogin(provider, { access_token });

      //This updates the user info for the site if we logged in with a code flow
      reload();
      navigate(urlAfterLogin);
      return;
    }

    if (!access_token) {
      setError("Missing access_token");
      return;
    }

    await registerLogin(provider, { access_token });
    //This updates the user info for the site if we logged in with a token flow
    reload();
    navigate(urlAfterLogin);
  }, []);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <LoadingComponent message={"Fetching user data, please wait..."} />;
}

export function Login({ config }) {
  const { handleLogin } = useContext(ChatApiContext);
  const { provider } = useParams();
  const { error } = useLoading(() => handleLogin(provider, config));
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <LoadingComponent message={"Redirecting to login, please wait"} />;
}

export function Logout({ reload }) {
  const navigate = useNavigate();
  const { endSession } = useContext(ChatApiContext);
  useEffect(async () => {
    await endSession();
    reload();
    navigate("/");
  });
  return <LoadingComponent message={"Logging out, please wait..."} />;
}

export function LoginPage({ reload }) {
  const { fetchConfig } = useContext(ChatApiContext);
  const { data, error, loading } = useLoading(() => fetchConfig());
  if (error) {
    return <ErrorComponent error={"Unable to fetch login configuration..."} />;
  }
  if (loading) {
    return <LoadingComponent message={"Fetching login config..."} />;
  }
  return (
    <Routes>
      <Route path={"/:provider"} element={<Login config={data} />} />
      <Route
        path={"/:provider/callback"}
        element={<LoginCallback config={data} reload={reload} />}
      />
      <Route path={"/endsession"} element={<Logout reload={reload} />} />
    </Routes>
  );
}
