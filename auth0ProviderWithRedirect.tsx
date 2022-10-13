import { Auth0Provider, AppState } from "@auth0/auth0-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export function Auth0ProviderWithRedirect({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const domain = "https://magnushodne.eu.auth0.com";
  const clientId = "JN8jmWPtBrI52sVNAAP5ZHntM4VKAc3L";
  let redirectUri = "http://localhost:3000/oauth2/callback";
  let audience = "http://localhost:5000";

  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
